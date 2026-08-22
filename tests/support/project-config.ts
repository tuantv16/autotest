/**
 * Cầu nối từ test sang `project.config.json` — cấu hình duy nhất của workspace.
 *
 * Vì sao cần file này: engine `autotest/` dùng chung cho nhiều dự án, nhưng tên container
 * database, thứ tự xóa theo khóa ngoại, prefix dữ liệu test... đổi theo từng dự án.
 * Hardcode vào code test thì mỗi lần đổi dự án phải sửa code. Đọc từ cấu hình thì đổi dự
 * án = sửa `project.config.json`, code test không đụng tới.
 *
 * Mọi khóa bắt đầu bằng `$` là chú thích cho người đọc, bị bỏ khi parse — cùng quy ước
 * với `tools/config/cfg.py`.
 */

import * as fs from 'fs';
import * as path from 'path';

/** Tri thức dọn dữ liệu test. Nguồn: project.config.json → advanced.database */
export interface DatabaseConfig {
  kind?: string;
  container?: string;
  name?: string;
  /** Thứ tự bảng khi xóa. Sai thứ tự là lỗi khóa ngoại. */
  cleanupOrder: string[];
  /** Bảng xóa mềm: xóa qua UI vẫn còn row, vẫn chiếm mã. */
  softDeleteTables: string[];
  /** Prefix mã do test tạo. Mỗi prefix PHẢI có dòng DELETE trong cleanup SQL. */
  testDataPrefixes: Record<string, string[]>;
  /** Cột khóa nghiệp vụ của từng bảng, dùng để xóa đúng row mà test tạo ra. */
  tableKeys: Record<string, string>;
  /**
   * Mẫu giá trị được BẢO VỆ — dữ liệu seed, không bao giờ được xóa. Dùng ký tự `%` như
   * LIKE của SQL. Seeder từ chối track giá trị khớp mẫu ở đây nên không xóa nhầm seed.
   */
  protectedPatterns: Record<string, string[]>;
  /**
   * SQL chạy TRƯỚC khi xóa row của một bảng, để hoàn tác tác dụng phụ mà app gây ra
   * (ví dụ tạo đơn thì trừ tồn kho, xóa đơn không tự cộng lại).
   * `{values}` được thay bằng danh sách giá trị đã track, đã escape.
   */
  beforeDelete: Record<string, string[]>;
  /** Lệnh làm sạch cả database — cấm tuyệt đối, `DbRunner` từ chối chạy. */
  forbiddenCommands: string[];
}

export interface AdvancedConfig {
  modulePrefix?: string;
  screenPrefix?: string;
  appStack?: string;
  baseUrlEnvVar?: string;
  cleanupCmd?: string;
  cleanupSql?: string;
  database?: Partial<DatabaseConfig>;
  [key: string]: unknown;
}

export interface ProjectConfig {
  projectName: string;
  appSourcePath: string;
  testDataPath: string;
  baseUrl: string;
  advanced: AdvancedConfig;
  [key: string]: unknown;
}

/** Bỏ mọi khóa `$...` (chú thích) khỏi cấu hình đã parse. */
function stripComments(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripComments);
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (key.startsWith('$')) continue;
      out[key] = stripComments(val);
    }
    return out;
  }
  return value;
}

/**
 * Tìm `project.config.json` bằng cách đi ngược lên từ file này — không hardcode số cấp
 * thư mục, để còn di chuyển được file mà không vỡ.
 */
function findConfigFile(): string {
  let dir = __dirname;
  for (let depth = 0; depth < 8; depth += 1) {
    const candidate = path.join(dir, 'project.config.json');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(
    `[project-config] Không tìm thấy project.config.json khi đi ngược từ ${__dirname}. ` +
      'Đây là cấu hình duy nhất của workspace — không có nó thì test không biết đang ' +
      'chạy trên dự án nào.',
  );
}

let cached: ProjectConfig | null = null;

/** Đọc cấu hình dự án đang active. Cache trong một lần chạy. */
export function projectConfig(): ProjectConfig {
  if (cached) return cached;

  const file = findConfigFile();
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (error: any) {
    throw new Error(`[project-config] ${file} không phải JSON hợp lệ: ${error?.message}`);
  }

  const config = stripComments(parsed) as ProjectConfig;
  if (!config.projectName) {
    throw new Error(`[project-config] ${file} thiếu khóa bắt buộc 'projectName'.`);
  }
  config.advanced = config.advanced || {};
  cached = config;
  return cached;
}

/** Khối `advanced.database`, đã điền mặc định rỗng để bên gọi không phải kiểm null. */
export function databaseConfig(): DatabaseConfig {
  const db = projectConfig().advanced.database || {};
  return {
    cleanupOrder: [],
    softDeleteTables: [],
    testDataPrefixes: {},
    tableKeys: {},
    protectedPatterns: {},
    beforeDelete: {},
    forbiddenCommands: [],
    ...db,
  } as DatabaseConfig;
}

/**
 * Base URL của app đang test: đọc biến môi trường khai ở `advanced.baseUrlEnvVar`,
 * không có thì lấy `baseUrl` trong cấu hình.
 */
export function projectBaseUrl(): string {
  const config = projectConfig();
  const envVar = config.advanced.baseUrlEnvVar;
  const fromEnv = envVar ? process.env[envVar] : undefined;
  return String(fromEnv || config.baseUrl || '').replace(/\/+$/, '');
}
