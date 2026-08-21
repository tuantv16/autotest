# Hướng dẫn chạy test — RA101 (Quản lý sản phẩm, Retail App)

Dành cho người **không cần biết code**. Làm theo đúng thứ tự là chạy được.

## Đang có gì

| Màn hình | File test | Số test | Cần nạp data mồi? |
|---|---|---|---|
| **WRA10102** — Thêm sản phẩm | `WRA10102/wra10102-register.spec.ts` | 2 | **Không.** Fixture `retailData` tự tạo và tự xóa |
| WRA10101 — Danh sách / Tìm sản phẩm | *chưa có* | 0 | Có, khi nào sinh test thì dùng `seed-wra10101.sql` |
| WRA10103 — Sửa sản phẩm | *chưa có* | 0 | — |

Hai test của WRA10102:

- `WRA10102_01` — Đăng ký sản phẩm thành công
- `WRA10102_02` — Đăng ký thất bại khi Mã SKU đã tồn tại

## Chạy nhanh — 2 lệnh

Mở terminal ở gốc workspace (`d:\Project\team1`):

```bash
# 1. Bật app (bỏ qua nếu đã chạy)
cd apps/retail_app && DOCKER_CONTEXT=default docker compose up -d && cd ../..

# 2. Chạy test — TỰ dọn dữ liệu sau khi chạy xong
cd autotest && npm run test:ra101
```

`npm run test:ra101` = chạy test rồi tự gọi `cleanup:ra101`.

Với các test dùng fixture `retailData` (hiện là toàn bộ test WRA10102) thì **không cần
làm gì cả**: mỗi test tự tạo dữ liệu của nó rồi tự xóa cứng khi kết thúc, **kể cả khi test
fail hoặc timeout**. Chạy xong database về đúng trạng thái trước khi chạy.

`npm run cleanup:ra101` giờ chỉ còn là **lưới an toàn**, cần khi:

- tiến trình test bị kill giữa đường (Ctrl+C) làm fixture không kịp dọn,
- hoặc có màn dùng data mồi nạp bằng SQL tay (xem Bước 2).

---

## Chi tiết từng bước

### Bước 1 — App phải đang chạy

Test bấm vào giao diện thật, nên app phải sống trước đã.

```bash
cd apps/retail_app
DOCKER_CONTEXT=default docker compose up -d
```

Kiểm lại — phải thấy **2 container** và **HTTP 200**:

```bash
DOCKER_CONTEXT=default docker ps --format "{{.Names}}\t{{.Status}}" | grep retail
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:8080/
```

> **Máy này dùng Rancher Desktop, không phải Docker Desktop.** Thiếu
> `DOCKER_CONTEXT=default` thì mọi lệnh `docker` báo `cannot find the file specified`
> dù container vẫn đang chạy bình thường. Gõ một lần cho cả phiên terminal:
>
> ```bash
> export DOCKER_CONTEXT=default
> ```

Lần đầu chạy còn phải cài trình duyệt cho Playwright:

```bash
cd autotest && npx playwright install
```

### Bước 2 — Nạp data mồi (WRA10102 thì KHÔNG cần)

Hai test WRA10102 dùng fixture `retailData` nên **tự dựng dữ liệu tiền đề của chúng**.
Bỏ qua bước này.

> **Fixture `retailData` làm gì** (`autotest/tests/utils/db/retail-data.ts`):
>
> ```ts
> test('...', async ({ retailData }) => {
>   const p = await retailData.seedProduct({
>     name: 'Bàn làm việc', price: 2500000, stock: 15, isActive: true,
>   });
>   // p.sku là mã duy nhất vừa tạo, ví dụ 'FIXT-SKU-1787334002505814'
> });
> // Hết test -> tự XÓA CỨNG đúng mã đó, kể cả khi test fail
> ```
>
> Nhờ vậy test không phụ thuộc database đang có gì, và ai chạy ở máy nào cũng ra kết quả
> như nhau. Test tự tạo sản phẩm qua giao diện thì gọi `retailData.track(sku)` ngay trước
> khi bấm Lưu để fixture nhận dọn.

Chỉ màn nào có file `seed-*.sql` mới cần nạp tay. Ví dụ khi có test cho WRA10101:

```bash
python tools/data/run_sql.py seed-wra10101.sql
```

Lệnh này in ra số dòng đã nạp — nhìn số đó xem có đúng thiết kế không. Ví dụ
`seed-wra10101.sql` phải in `4 | 2 | 2` (4 sản phẩm, 2 Đang bán, 2 Ngừng bán). Sai số
này thì **đừng chạy test**, cả bộ sẽ fail vì thiếu tiền đề chứ không phải vì app sai.

### Bước 3 — Chạy test

Từ thư mục `autotest/`:

```bash
npm run test:ra101                                            # cả module RA101 + TỰ DỌN
npm run test:ra101:noclean                                    # cả module, KHÔNG dọn
npx playwright test tests/modules/RA101/WRA10102 --workers=1   # đúng 1 màn hình
```

Chỉ `npm run test:ra101` mới tự dọn. Gọi `npx playwright test` trực tiếp thì phải tự dọn
ở Bước 4.

`--workers=1` = chạy lần lượt từng test. Chậm hơn nhưng loại được chuyện hai test tranh
nhau dữ liệu. Lần đầu chạy nên dùng.

Chạy có chọn lọc:

```bash
npx playwright test -g "WRA10102_01"     # đúng 1 test theo mã
npx playwright test --headed             # mở trình duyệt lên xem nó bấm gì
npx playwright test --debug              # dừng từng bước để soi
```

Kiểm cú pháp mà **không chạy thật** (nhanh, dùng khi vừa sửa code test):

```bash
npx playwright test tests/modules/RA101/WRA10102 --list
```

Lệnh này biên dịch thật mọi file nên bắt được lỗi cú pháp, import sai, gọi hàm không tồn
tại. Nó in ra danh sách test tìm thấy — không thấy đủ số test là có lỗi.

> `npx tsc --noEmit` **hiện không dùng được** trong repo này (thiếu `@types/node`), sẽ
> báo lỗi `TS2688` kể cả khi code hoàn toàn đúng. Dùng `--list` thay thế.

### Bước 4 — Dọn dữ liệu

Test dùng fixture `retailData` **tự dọn xong rồi**, không cần làm gì. Chỉ gọi tay khi:

- tiến trình test bị kill giữa đường (Ctrl+C, treo máy) nên fixture không kịp dọn,
- hoặc màn hình đó dùng data mồi nạp bằng SQL tay ở Bước 2 (ví dụ `seed-wra10101.sql`).

```bash
cd autotest && npm run cleanup:ra101      # từ autotest/
python tools/data/run_sql.py              # hoặc từ gốc workspace
```

Kiểm đã sạch chưa:

```bash
DOCKER_CONTEXT=default docker exec -i retail_mysql mysql -ularavel -psecret laravel -e \
  "SELECT COUNT(*) FROM products WHERE deleted_at IS NOT NULL;"
```

#### Vì sao phải dọn dữ liệu

Bảng `products` dùng **xóa mềm**: xóa qua giao diện chỉ đánh dấu `deleted_at`, dòng dữ
liệu **vẫn nằm trong database và vẫn chiếm mã SKU** (cột UNIQUE). Vì vậy fixture
`retailData` xóa **cứng** bằng SQL chứ không xóa qua giao diện — vừa sạch hẳn, vừa nhanh
hơn nhiều.

Fixture xóa theo **đúng danh sách mã nó đã tạo**, không theo prefix. Nhờ vậy hai test chạy
song song không xóa dữ liệu của nhau.

`cleanup.sql` là lớp thứ hai, xóa theo **prefix mã SKU của test** (`AUTO-SKU-`, `DUP-SKU-`,
`OVER-PRICE-`, `SEARCH-SKU-`, `FIXT-SKU-`) để hớt phần rơi lại khi fixture không kịp chạy.
Cả hai lớp đều không bao giờ đụng tới dữ liệu nghiệp vụ thật.

---

## Xem kết quả

Chạy xong, terminal in dạng này:

```
  ok 1 ... WRA10102_01 - Đăng ký sản phẩm thành công (11.4s)
  ok 2 ... WRA10102_02 - Đăng ký thất bại khi Mã SKU đã tồn tại (8.2s)

  2 passed (19.6s)
```

Báo cáo có ảnh, có video, xem được từng bước:

```bash
cd autotest && npm run test:report
```

Ảnh chụp trong lúc chạy nằm ở `autotest/screenshots/<MODULE>/<SCREEN>/<mã test>/` — mỗi
test có ảnh **trước** khi bấm (`input`) và **sau** khi kết quả hiện ra (`output`). Ví dụ:

```
autotest/screenshots/RA101/WRA10102/WRA10102_02/input/...
autotest/screenshots/RA101/WRA10102/WRA10102_02/output/...
```

Test fail thì có thêm ảnh chụp đúng lúc fail.

---

## Test fail thì làm gì

Phân biệt hai loại, **cách xử lý ngược nhau**:

| Dấu hiệu | Loại | Xử lý |
|---|---|---|
| `Timeout`, `locator not found`, `strict mode violation` | **Lỗi kỹ thuật** của test | Sửa test / page object được |
| `Duplicate entry` cho mã SKU | **Rác dữ liệu** lần chạy trước | Chạy `python tools/data/run_sql.py` rồi chạy lại |
| `ECONNREFUSED`, trang trắng | **App chưa chạy** | Quay lại Bước 1 |
| `expect(received).toBe(expected)` — app hiện đúng nhưng khác chữ mong đợi | **Nghi vấn bug** | **Giữ nguyên, để nó fail.** Báo lại |

Với loại cuối cùng — **tuyệt đối không** sửa `expect(...)` cho khớp app, không đổi `toBe`
thành `toContain`, không `test.skip`, không comment assertion. Test đỏ ở đây nghĩa là app
chạy khác điều khách viết trong testcase, và đó chính là **thứ cần báo cho dev**. Sửa test
cho xanh là xóa mất phát hiện đó.

Ghi lại 4 dòng rồi gửi cho người phụ trách:

```
Mã test    : WRA10102_02
Kỳ vọng    : <chuỗi test mong đợi>
Thực tế    : <chuỗi app hiện ra>
Ảnh        : autotest/screenshots/...
```

---

## Cạm bẫy hay gặp

| Hiện tượng | Nguyên nhân |
|---|---|
| `cannot find the file specified` khi gõ `docker` | Thiếu `DOCKER_CONTEXT=default` (Rancher Desktop) |
| Lần chạy đầu OK, lần sau fail `Duplicate entry` | Chưa dọn dữ liệu. Test fail thì `npm run test:ra101` KHÔNG tự dọn — gọi `npm run cleanup:ra101` |
| Test tìm không thấy sản phẩm dù vừa tạo | Danh sách phân trang 12 dòng/trang — phải tìm kiếm để lọc, không đếm theo vị trí dòng |
| `snapInput/snapExpect` throw lúc chạy | File test đặt sai chỗ. Phải nằm đúng `tests/modules/<MODULE>/<SCREEN>/` |
| Mất hết `snapInput`, `snapExpect` | Test import từ `@playwright/test` thay vì `../../../base/base-test` |
| Chạy `npx tsc --noEmit` ra `TS2688` | Đã biết, thiếu `@types/node`. Dùng `--list` thay thế |

## Ba điều tuyệt đối không làm

1. **Không chạy `php artisan db:seed` hay `migrate:fresh`.** Seeder của app gọi
   `truncate()` — nó xóa sạch toàn bộ database, kể cả dữ liệu không phải của test. Hai
   lệnh này đã bị chặn cứng trong `.claude/settings.json`.
2. **Không sửa `expect(...)` cho khớp app.** Xem mục "Test fail thì làm gì".
3. **Không sửa source code trong `apps/`** để test pass. Đó là phần mềm đang được kiểm.

## Tài liệu liên quan

- Luật chung của workspace: [CLAUDE.md](../../../../CLAUDE.md)
- Data mồi & dọn data: [test_data/README.md](../../../../test_data/README.md)
- Tài liệu màn hình: `specs/retail_spec/RA101/`
- Testcase gốc của khách: `testcases/retail_testcases/product/`
- Sinh thêm test: `/create-testcase-auto` · Chạy lại: `/run-testcase-auto`
