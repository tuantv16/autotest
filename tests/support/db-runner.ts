/**
 * Chạy SQL vào database của **dự án đang active**, không biết đó là dự án nào.
 *
 * Lệnh kết nối lấy nguyên văn từ `project.config.json → advanced.cleanupCmd` — đúng
 * chuỗi mà `tools/data/run_sql.py` dùng. Nghĩa là chỉ có MỘT chỗ khai cách nối database
 * cho cả phía Python và phía TypeScript; đổi dự án (đổi container, đổi user) không phải
 * sửa dòng code nào.
 *
 * Vì sao chạy qua `child_process` chứ không qua driver database:
 * `autotest/package.json` chỉ có 3 devDependency (@playwright/test, dotenv, typescript).
 * Không có `mysql2`, và `tests/utils/oracle-db.ts` import `oracledb` cũng chưa được cài
 * (chỉ cần import là throw lúc collect test). Dùng `child_process` thì KHÔNG cần cài
 * thêm gì, và `package.json` là vùng cấm (CLAUDE.md §1 Luật 3).
 *
 * Cạm bẫy Rancher Desktop: `DOCKER_CONTEXT=default` là BẮT BUỘC — context mặc định
 * `desktop-linux` trỏ vào daemon không tồn tại nên mọi lệnh docker báo "cannot find the
 * file specified" dù container vẫn chạy. Đã khai ở `.claude/settings.json#env`; runner
 * này tự điền nếu môi trường chưa có.
 */

import { execFileSync } from 'child_process';
import { databaseConfig, projectConfig } from './project-config';

/** Một dòng kết quả truy vấn: tên cột → giá trị dạng chuỗi (hoặc null). */
export type SqlRow = Record<string, string | null>;

/**
 * Tách chuỗi lệnh thành argv, hiểu dấu nháy đơn và nháy kép.
 * Tương đương `shlex.split` của Python, đủ cho các dạng `cleanupCmd` thực tế.
 */
export function splitCommand(command: string): string[] {
  const parts: string[] = [];
  let current = '';
  let quote: '"' | "'" | null = null;
  let hasContent = false;

  for (const char of command) {
    if (quote) {
      if (char === quote) quote = null;
      else current += char;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      hasContent = true;
      continue;
    }
    if (/\s/.test(char)) {
      if (current || hasContent) parts.push(current);
      current = '';
      hasContent = false;
      continue;
    }
    current += char;
  }
  if (current || hasContent) parts.push(current);

  if (quote) {
    throw new Error(`[db-runner] cleanupCmd có dấu nháy không đóng: ${command}`);
  }
  return parts;
}

/** Escape một giá trị thành literal SQL an toàn. */
export function sqlLiteral(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error(`[db-runner] Giá trị số không hợp lệ: ${value}`);
    }
    return String(value);
  }
  // MySQL hiểu cả `\` nên escape backslash trước, rồi mới nhân đôi dấu nháy đơn.
  const escaped = String(value).replace(/\\/g, '\\\\').replace(/'/g, "''");
  return `'${escaped}'`;
}

/** Danh sách literal dùng cho `IN (...)`. Rỗng thì trả `NULL` để `IN (NULL)` không khớp gì. */
export function sqlValueList(values: Array<string | number>): string {
  if (values.length === 0) return 'NULL';
  return values.map((v) => sqlLiteral(v)).join(', ');
}

/**
 * Chuyển mẫu kiểu LIKE của SQL (`PET-SAMPLE-%`) thành RegExp, để kiểm phía TypeScript
 * mà không phải hỏi database.
 */
export function likeToRegExp(pattern: string): RegExp {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const body = escaped.replace(/%/g, '.*').replace(/_/g, '.');
  return new RegExp(`^${body}$`, 'i');
}

export class DbRunner {
  private readonly command: string;
  private readonly forbidden: string[];

  constructor(command?: string) {
    const config = projectConfig();
    const resolved = command || config.advanced.cleanupCmd;
    if (!resolved) {
      throw new Error(
        '[db-runner] project.config.json → advanced.cleanupCmd chưa khai. Đây là lệnh ' +
          'kết nối database của app đang test, ví dụ:\n' +
          '  "docker exec -i petshop-db mysql -upetuser -ppetpass petshop"',
      );
    }
    this.command = resolved;
    this.forbidden = databaseConfig().forbiddenCommands || [];
  }

  /**
   * Chặn các câu lệnh làm sạch cả database. Nguồn danh sách:
   * `advanced.database.forbiddenCommands` + một số lệnh không bao giờ đúng trong test.
   */
  private assertAllowed(sql: string): void {
    const normalized = sql.replace(/\s+/g, ' ').toLowerCase();

    const always = ['drop database', 'drop schema', 'drop table'];
    for (const phrase of always) {
      if (normalized.includes(phrase)) {
        throw new Error(
          `[db-runner] Từ chối chạy SQL có "${phrase}". Test không được phá cấu trúc ` +
            'database. Cần dựng lại schema thì đó là việc của người vận hành.',
        );
      }
    }

    for (const forbiddenRaw of this.forbidden) {
      const forbidden = String(forbiddenRaw).replace(/\s+/g, ' ').toLowerCase();
      // forbiddenCommands có cả lệnh shell (docker compose down -v) lẫn lệnh SQL
      // (TRUNCATE TABLE products). Chỉ so phần trông như SQL.
      if (!forbidden || !/^(truncate|delete|drop|update|insert|alter)/.test(forbidden)) continue;
      if (normalized.includes(forbidden)) {
        throw new Error(
          `[db-runner] Từ chối chạy SQL khớp advanced.database.forbiddenCommands: ` +
            `"${forbiddenRaw}". Đây là lệnh làm sạch dữ liệu seed của cả dự án.`,
        );
      }
    }
  }

  /** Chạy SQL, không quan tâm kết quả trả về. */
  exec(sql: string): void {
    this.run(sql);
  }

  /**
   * Chạy SQL và trả về các dòng kết quả.
   *
   * Client `mysql` khi không chạy trong terminal sẽ in ra TSV, dòng đầu là tên cột —
   * đó là định dạng được parse ở đây. Giá trị `NULL` của MySQL in ra chuỗi `NULL`,
   * được đổi lại thành `null`.
   */
  query(sql: string): SqlRow[] {
    const stdout = this.run(sql);
    const lines = stdout.split(/\r?\n/).filter((line) => line.length > 0);
    if (lines.length < 2) return [];

    const headers = lines[0].split('\t');
    return lines.slice(1).map((line) => {
      const cells = line.split('\t');
      const row: SqlRow = {};
      headers.forEach((header, index) => {
        const cell = cells[index];
        row[header] = cell === undefined || cell === 'NULL' ? null : cell;
      });
      return row;
    });
  }

  /** Trả về một giá trị vô hướng của câu truy vấn (cột đầu, dòng đầu). */
  scalar(sql: string): string | null {
    const rows = this.query(sql);
    if (rows.length === 0) return null;
    const first = rows[0];
    const keys = Object.keys(first);
    return keys.length ? first[keys[0]] : null;
  }

  private run(sql: string): string {
    this.assertAllowed(sql);

    const argv = splitCommand(this.command);
    const [bin, ...args] = argv;

    // SET NAMES utf8mb4 là bắt buộc: tên sản phẩm/khách hàng tiếng Việt sẽ bị
    // double-encoding nếu client mặc định latin1.
    const script = `SET NAMES utf8mb4;\n${sql}\n`;

    try {
      return execFileSync(bin, args, {
        input: script,
        encoding: 'utf-8',
        env: { ...process.env, DOCKER_CONTEXT: process.env.DOCKER_CONTEXT || 'default' },
        maxBuffer: 32 * 1024 * 1024,
      });
    } catch (error: any) {
      const stderr = String(error?.stderr || '')
        .split(/\r?\n/)
        .filter((line: string) => line && !/using a password/i.test(line))
        .join('\n');
      throw new Error(
        [
          `[db-runner] Lệnh SQL thất bại (mã ${error?.status ?? '?'}).`,
          `  Lệnh   : ${this.command}`,
          `  SQL    : ${sql.replace(/\s+/g, ' ').slice(0, 300)}`,
          stderr ? `  Lỗi    : ${stderr}` : '',
          '  Kiểm container còn chạy không: docker -c default ps',
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }
  }
}

/** Runner dùng chung, dựng lười để test không cần database thì không chạm tới nó. */
let shared: DbRunner | null = null;

export function dbRunner(): DbRunner {
  if (!shared) shared = new DbRunner();
  return shared;
}
