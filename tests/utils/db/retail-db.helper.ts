/**
 * Cầu nối tới MySQL của retail_app — dùng cho việc TẠO và XÓA dữ liệu test.
 *
 * Vì sao chạy SQL qua `docker exec` chứ không qua driver MySQL của Node:
 * dự án chưa cài `mysql2`, và `tests/utils/oracle-db.ts` import `oracledb` cũng
 * chưa được cài (chỉ cần import là throw lúc collect test). Dùng `child_process`
 * có sẵn của Node thì KHÔNG cần thêm bất kỳ thư viện nào.
 *
 * Cấu hình lấy từ biến môi trường trong `.env.test` (base-test.ts nạp sẵn), có giá
 * trị mặc định trỏ đúng docker-compose của retail_app — nên không khai gì vẫn chạy.
 *
 * | Biến                    | Mặc định       |
 * |-------------------------|----------------|
 * | RETAIL_DB_CONTAINER     | retail_mysql   |
 * | RETAIL_DB_USER          | laravel        |
 * | RETAIL_DB_PASSWORD      | secret         |
 * | RETAIL_DB_NAME          | laravel        |
 * | DOCKER_CONTEXT          | default        |
 *
 * `DOCKER_CONTEXT=default` là BẮT BUỘC trên máy dùng Rancher Desktop: context mặc
 * định `desktop-linux` trỏ vào một daemon không tồn tại nên mọi lệnh docker báo
 * `cannot find the file specified` dù container vẫn đang chạy.
 */

import { execFileSync } from 'child_process';

interface RetailDbConfig {
  container: string;
  user: string;
  password: string;
  database: string;
  dockerContext: string;
}

function readConfig(): RetailDbConfig {
  return {
    container: process.env.RETAIL_DB_CONTAINER || 'retail_mysql',
    user: process.env.RETAIL_DB_USER || 'laravel',
    password: process.env.RETAIL_DB_PASSWORD || 'secret',
    database: process.env.RETAIL_DB_NAME || 'laravel',
    dockerContext: process.env.DOCKER_CONTEXT || 'default',
  };
}

/**
 * Bọc một giá trị thành literal an toàn cho MySQL.
 * `null`/`undefined` -> NULL. Số -> để nguyên. Còn lại -> chuỗi đã escape.
 *
 * Chỉ escape `\` và `'` — đủ với MySQL ở chế độ mặc định (NO_BACKSLASH_ESCAPES tắt).
 * Hàm này chỉ dùng cho DỮ LIỆU TEST do chính test khai, không nhận đầu vào từ ngoài.
 */
export function sqlValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  if (typeof value === 'boolean') {
    return value ? '1' : '0';
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error(`[retail-db] Số không hợp lệ, không dựng được câu SQL: ${value}`);
    }
    return String(value);
  }

  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

/** Chạy SQL, trả về nguyên văn stdout của mysql client */
function exec(sql: string, extraArgs: string[] = []): string {
  const cfg = readConfig();

  const args = [
    'exec',
    '-i',
    cfg.container,
    'mysql',
    `-u${cfg.user}`,
    `-p${cfg.password}`,
    cfg.database,
    '--default-character-set=utf8mb4',
    ...extraArgs,
  ];

  try {
    return execFileSync('docker', args, {
      input: sql,
      encoding: 'utf-8',
      env: { ...process.env, DOCKER_CONTEXT: cfg.dockerContext },
      stdio: ['pipe', 'pipe', 'pipe'],
      maxBuffer: 16 * 1024 * 1024,
    });
  } catch (error: any) {
    // stderr của mysql client luôn có dòng cảnh báo mật khẩu — bỏ nó khỏi thông báo lỗi
    const stderr = String(error?.stderr || '')
      .split('\n')
      .filter((line) => line.trim() && !line.includes('Using a password on the command line'))
      .join('\n');

    throw new Error(
      [
        '[retail-db] Không chạy được SQL trên database của retail_app.',
        `  Container : ${cfg.container}   (DOCKER_CONTEXT=${cfg.dockerContext})`,
        stderr ? `  Lỗi       : ${stderr}` : `  Lỗi       : ${error?.message}`,
        '',
        '  Kiểm theo thứ tự:',
        '    1. DOCKER_CONTEXT=default docker ps          -> phải thấy container ở trên',
        '    2. cd apps/retail_app && docker compose up -d -> bật app nếu chưa chạy',
        '    3. Sai tên container/user thì khai lại trong autotest/.env.test',
        '',
        '  SQL đã gửi:',
        sql
          .split('\n')
          .map((l) => `    ${l}`)
          .join('\n'),
      ].join('\n'),
    );
  }
}

/** Chạy SQL không cần đọc kết quả (INSERT / DELETE / UPDATE) */
export function runSql(sql: string): void {
  exec(sql);
}

/**
 * Chạy SELECT và trả về các dòng đã tách theo cột.
 * Dùng cờ `-N` nên KHÔNG có dòng tiêu đề trong kết quả.
 */
export function querySql(sql: string): string[][] {
  const out = exec(sql, ['-N']);

  return out
    .split('\n')
    .map((line) => line.replace(/\r$/, ''))
    .filter((line) => line.length > 0)
    .map((line) => line.split('\t'));
}

/** Tiện dụng: SELECT trả về đúng một ô */
export function querySingleValue(sql: string): string | null {
  const rows = querySql(sql);
  if (rows.length === 0 || rows[0].length === 0) {
    return null;
  }
  return rows[0][0] === 'NULL' ? null : rows[0][0];
}
