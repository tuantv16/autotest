# ⚡ Quick Fix Guide - Khắc phục lỗi save với DB thật

## 🎯 Nguyên nhân

**Test data ID không tồn tại trong database thật!**

```
Test data: jznuridenNo = "00102498019991"
                ↓
Database thật: KHÔNG CÓ RECORD NÀY
                ↓
Backend validation: FAILED ❌
                ↓
Lỗi: "登録処理でエラーが発生しました。"
```

## ✅ 3 Cách khắc phục (chọn 1 trong 3)

---

### 🔧 **Cách 1: Tạo test data trong Database (KHUYẾN NGHỊ)**

#### Bước 1: Chạy script SQL setup
```sql
-- File: scripts/setup-test-data.sql
-- Connect vào database và chạy script này
```

#### Bước 2: Verify data đã tạo
```sql
SELECT * FROM TBL_JZN_URIDEN 
WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992');
-- Expected: 2 rows
```

#### Bước 3: Chạy lại test
```powershell
cd d:\project_vti2_auto_test\Playwright
npx playwright test tests/modules/TY205/WTY20501/wty20501-insert.spec.ts
```

**Ưu điểm:** ✅ Đơn giản, nhanh chóng, data cố định  
**Nhược điểm:** ⚠️ Cần quyền access database

---

### 🔍 **Cách 2: Dùng data thật từ Database**

#### Bước 1: Query data thật
```sql
-- File: scripts/query-existing-data.sql
-- Chạy query #1 để tìm phiếu khả dụng
SELECT 
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    STATUS
FROM TBL_JZN_URIDEN
WHERE STATUS = '0'                    -- Editable
  AND STORE_CD = 'C0001'              -- Your store
ORDER BY JZNURIDEN_HKK_DATE DESC
LIMIT 5;
```

#### Bước 2: Copy ID và Date
Ví dụ kết quả:
```
JZNURIDEN_NO     | JZNURIDEN_HKK_DATE | STATUS
00102498012345   | 20250106           | 0
00102498012346   | 20250107           | 0
```

#### Bước 3: Update test data
**File: `tests/fixtures/TY205/wty20501.json`**

```json
{
  "wty20501": {
    "TC_01": {
      "sessionData": {
        "value": {
          "cartHeaderDT": [{
            "jznuridenNo": "00102498012345",     // ← ID THẬT
            "jznuridenHkkDate": "20250106",      // ← Date THẬT
            ...
          }]
        }
      }
    }
  }
}
```

#### Bước 4: Chạy lại test

**Ưu điểm:** ✅ Dùng data production, không cần tạo mới  
**Nhược điểm:** ⚠️ Data có thể thay đổi, cần update thường xuyên

---

### 🎭 **Cách 3: Tiếp tục dùng Mock (tạm thời)**

Nếu chưa có database sẵn sàng, dùng mock mode:

#### File: `pos_renewal_frontend/.env.development`
```env
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:8080/WebAP
PORT=5173
```

#### Restart frontend
```powershell
# Stop (Ctrl+C) và restart
cd pos_renewal_frontend
npm run dev
```

**Ưu điểm:** ✅ Không cần database, test nhanh  
**Nhược điểm:** ⚠️ Không test được backend thật

---

## 📋 Checklist

### Nếu chọn Cách 1 (Setup test data):
- [ ] Connect vào database
- [ ] Chạy `scripts/setup-test-data.sql`
- [ ] Verify 2 records được tạo
- [ ] Set `VITE_USE_MOCK=false`
- [ ] Chạy test và xem kết quả

### Nếu chọn Cách 2 (Dùng data thật):
- [ ] Chạy `scripts/query-existing-data.sql`
- [ ] Copy JZNURIDEN_NO và DATE từ kết quả
- [ ] Update `tests/fixtures/TY205/wty20501.json`
- [ ] Set `VITE_USE_MOCK=false`
- [ ] Chạy test và xem kết quả

### Nếu chọn Cách 3 (Mock):
- [ ] Set `VITE_USE_MOCK=true`
- [ ] Restart frontend
- [ ] Chạy test
- [ ] ⚠️ Nhớ chuyển sang DB thật sau

---

## 🔍 Debug nếu vẫn lỗi

### 1. Check console log
Mở Browser Console (F12), tìm:
```
[DEBUG] Sending request to backend: {...}
[DEBUG] Full response from backend: {...}
[DEBUG] Parsed resultDT: {
  "resultKbn": "1",           // ← "1" = Error
  "msgID": "MSE_...",         // ← Error code
  "message": "..."            // ← Error message
}
```

### 2. Common error codes

| msgID | Ý nghĩa | Giải pháp |
|-------|---------|-----------|
| MSE_JZN_NOT_FOUND | Không tìm thấy phiếu | Tạo test data hoặc dùng ID khác |
| MSE_JZN_LOCKED | Phiếu bị khóa | Dùng phiếu có STATUS=0 |
| MSE_NO_PERMISSION | Không có quyền | Dùng userId có quyền |
| MSE_INVALID_DATE | Date không hợp lệ | Check format YYYYMMDD |
| MSE_DB_ERROR | Lỗi database | Check DB connection |

### 3. Verify backend response
```powershell
node scripts/check-backend.js
```

Kết quả mong đợi:
```
✅ Backend responded with status: 200
📊 Result Analysis:
- resultKbn: 0 ✅ Success
- resultCode: 200
- message: Registration completed successfully
```

---

## 🚀 Quick Start (Recommended)

```powershell
# 1. Setup test data
cd d:\project_vti2_auto_test\Playwright
# Chạy scripts/setup-test-data.sql trong database client

# 2. Configure environment
cd pos_renewal_frontend
# Edit .env.development: VITE_USE_MOCK=false

# 3. Run test
cd ..
npx playwright test tests/modules/TY205/WTY20501/wty20501-insert.spec.ts --headed

# 4. Check result
# ✅ Success: Thấy "登録が完了しました。"
# ❌ Failed: Check console log để xem error chi tiết
```

---

## 📞 Need Help?

Nếu vẫn gặp lỗi, cung cấp:
1. **Console log** (Browser F12)
2. **Backend response** (từ [DEBUG] log)
3. **Database query result** (JZNURIDEN_NO status)
4. **Error message** chi tiết

---

## 📚 Tài liệu liên quan

- `ROOT_CAUSE_ANALYSIS.md` - Phân tích nguyên nhân chi tiết
- `scripts/fix-backend-issue.md` - Hướng dẫn debug backend
- `TROUBLESHOOTING.md` - Tổng hợp các vấn đề thường gặp
- `scripts/check-backend.js` - Script test backend connection
- `scripts/setup-test-data.sql` - Script tạo test data
- `scripts/query-existing-data.sql` - Script query data thật

