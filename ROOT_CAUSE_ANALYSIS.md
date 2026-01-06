# 🔍 Nguyên nhân gốc rễ: Tại sao save thất bại với Database thật?

## ❌ Vấn đề phát hiện

Test data đang sử dụng:
```json
{
  "jznuridenNo": "00102498019991",
  "jznuridenHkkDate": "20250210"
}
```

**NHƯNG**: Dữ liệu này **KHÔNG TỒN TẠI** trong database thật!

## 🔬 Phân tích chi tiết

### 1. Flow xử lý của WTY20501 (Màn hình nhập Summary/摘要欄)

```
User nhập thông tin → Click "確定" (Save)
                     ↓
Frontend gửi request đến backend với:
  - jznuridenNo: "00102498019991"      ← ID phiếu bán trước
  - jznuridenHkkDate: "20250210"       ← Ngày phát hành
  - mmrCstmNmKnj: "山田太郎"            ← Tên khách hàng
  - tkyRn: "これはテストの摘要欄入力です" ← Nội dung summary
                     ↓
Backend validate:
  ✅ Check xem jznuridenNo có tồn tại trong bảng JZN_URIDEN không?
  ✅ Check xem jznuridenHkkDate có khớp không?
  ✅ Check xem record có ở trạng thái cho phép update không?
                     ↓
❌ KHÔNG TÌM THẤY → Trả về error: resultKbn = "1"
                     ↓
Frontend hiển thị: "登録処理でエラーが発生しました。"
```

### 2. Tại sao MOCK data thành công?

Mock data trả về **GIẢ LẬP** response:

```typescript
// File: pos_renewal_frontend/src/mocks/TY205/TY205_WTY20501TkyRnInsBC.ts
{
  outDS: {
    resultDT: [{
      resultKbn: '0',  // ← Luôn trả về SUCCESS
      resultCode: '200',
      message: 'Registration completed successfully'
    }]
  }
}
```

Mock **KHÔNG KIỂM TRA** database thật → Luôn trả về thành công!

### 3. Tại sao Database thật thất bại?

Backend **THỰC SỰ KIỂM TRA** database:

```sql
-- Backend query (ví dụ):
SELECT * FROM TBL_JZN_URIDEN 
WHERE JZNURIDEN_NO = '00102498019991'
  AND JZNURIDEN_HKK_DATE = '20250210'
  
-- Kết quả: 0 rows found ❌
```

**Không tìm thấy record** → Backend trả về lỗi validation!

## 🎯 Nguyên nhân chính xác

### Backend validation logic (dự đoán):

1. **Check phiếu bán trước tồn tại:**
   ```java
   if (!jznUridenExists(jznuridenNo, jznuridenHkkDate)) {
       return error("MSE_JZN_NOT_FOUND", "事前売上伝票が見つかりません");
   }
   ```

2. **Check trạng thái phiếu:**
   ```java
   if (!jznUridenIsEditable(jznuridenNo)) {
       return error("MSE_JZN_LOCKED", "この伝票は編集できません");
   }
   ```

3. **Check quyền sửa:**
   ```java
   if (!userHasPermission(userId, jznuridenNo)) {
       return error("MSE_NO_PERMISSION", "権限がありません");
   }
   ```

Một trong các validation này **THẤT BẠI** → Save lỗi!

## ✅ Giải pháp

### Giải pháp 1: Tạo test data trong Database (KHUYẾN NGHỊ)

#### Bước 1: Tạo phiếu bán trước test trong DB

```sql
-- Tạo test record cho TC_01
INSERT INTO TBL_JZN_URIDEN (
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    KOK_CD,
    UESAMA_FLG,
    HB_KBN,
    STORE_CD,
    STATUS,
    CREATED_DATE
) VALUES (
    '00102498019991',    -- Test ID
    '20250210',          -- Test date
    'C0001',             -- Customer code
    '0',                 -- Flag
    '1',                 -- Type
    'C0001',             -- Store code
    '0',                 -- Editable status
    CURRENT_TIMESTAMP
);

-- Tạo test record cho TC_02
INSERT INTO TBL_JZN_URIDEN (
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    KOK_CD,
    UESAMA_FLG,
    HB_KBN,
    STORE_CD,
    STATUS,
    CREATED_DATE
) VALUES (
    '00102498019992',
    '20250215',
    'C0002',
    '0',
    '2',
    'C0002',
    '0',
    CURRENT_TIMESTAMP
);
```

#### Bước 2: Verify data tồn tại

```sql
SELECT * FROM TBL_JZN_URIDEN 
WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992');
```

### Giải pháp 2: Sử dụng data thật từ Database

#### Bước 1: Query record thật từ DB

```sql
-- Tìm phiếu bán trước khả dụng
SELECT 
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    KOK_CD,
    STATUS
FROM TBL_JZN_URIDEN
WHERE STATUS = '0'          -- Editable
  AND STORE_CD = 'C0001'    -- Your test store
  AND JZNURIDEN_HKK_DATE >= TO_CHAR(SYSDATE, 'YYYYMMDD')
ORDER BY JZNURIDEN_HKK_DATE DESC
LIMIT 5;
```

#### Bước 2: Cập nhật test data với ID thật

**File: `tests/fixtures/TY205/wty20501.json`**

```json
{
  "wty20501": {
    "TC_01": {
      "sessionData": {
        "key": "WTY20501_IN_SD",
        "value": {
          "cartHeaderDT": [{
            "jznuridenNo": "00102498012345",  // ← ID THẬT từ DB
            "jznuridenHkkDate": "20250106",   // ← Date THẬT từ DB
            "kokCd": "C0001",
            "uesamaFlg": "0",
            "hbKbn": "1"
          }]
        }
      }
    }
  }
}
```

### Giải pháp 3: Tạo script setup test data tự động

Tạo script để tự động tạo/cleanup test data trước/sau mỗi test run.

## 📝 Các lỗi backend thường gặp

| resultKbn | msgID | Ý nghĩa | Giải pháp |
|-----------|-------|---------|-----------|
| 1 | MSE_JZN_NOT_FOUND | Không tìm thấy phiếu bán trước | Tạo record trong DB |
| 1 | MSE_JZN_LOCKED | Phiếu đã bị khóa/không sửa được | Dùng phiếu khác với STATUS=0 |
| 1 | MSE_NO_PERMISSION | Không có quyền sửa | Dùng userId có quyền |
| 1 | MSE_INVALID_DATE | Ngày không hợp lệ | Kiểm tra format date |
| 1 | MSE_DUPLICATE_KEY | Trùng khóa chính | Summary đã tồn tại, dùng phiếu khác |
| 1 | MSE_DB_ERROR | Lỗi database | Kiểm tra DB connection/schema |

## 🔧 Debug steps tiếp theo

### 1. Check console log chi tiết

Sau khi chạy test, xem console:

```
[DEBUG] Sending request to backend: {
  "inDS": {
    "tkyRnInDT": [{
      "jznuridenNo": "00102498019991",  // ← ID không tồn tại
      "jznuridenHkkDate": "20250210"
    }]
  }
}

[DEBUG] Full response from backend: {
  "outDS": {
    "resultDT": [{
      "resultKbn": "1",                    // ← Error
      "msgID": "MSE_JZN_NOT_FOUND",        // ← Error code
      "message": "事前売上伝票が見つかりません",  // ← Error message
      "msgArg1": "00102498019991"
    }]
  }
}
```

### 2. Kiểm tra backend log

File: `pos_renewal_backend/logs/application.log`

```
ERROR [TY205] WTY20501TkyRnInsBC - Record not found: jznuridenNo=00102498019991
ERROR [TY205] Validation failed: JznUridenEntity not exists
```

### 3. Verify database schema

```sql
-- Check table structure
DESC TBL_JZN_URIDEN;

-- Check constraints
SELECT * FROM USER_CONSTRAINTS 
WHERE TABLE_NAME = 'TBL_JZN_URIDEN';
```

## 📊 Tóm tắt

| Môi trường | Kết quả | Lý do |
|------------|---------|-------|
| **Mock (VITE_USE_MOCK=true)** | ✅ Thành công | Trả về fake response, không check DB |
| **Real DB (VITE_USE_MOCK=false)** | ❌ Thất bại | Test data không tồn tại trong DB thật |

### Root cause:
```
Test data ID = "00102498019991" 
    ↓
Không tồn tại trong database thật
    ↓
Backend validation failed
    ↓
resultKbn = "1" (Error)
    ↓
Frontend hiển thị: "登録処理でエラーが発生しました。"
```

## ✅ Hành động tiếp theo

1. **Query database** để tìm record thật có sẵn
2. **Hoặc tạo test data** trong database
3. **Update test fixture** với ID thật
4. **Chạy lại test** với `VITE_USE_MOCK=false`

Bạn muốn tôi giúp tạo script setup test data trong database không? 🚀

