# Hướng dẫn khắc phục lỗi khi VITE_USE_MOCK=false

## Vấn đề
- **VITE_USE_MOCK=true**: Thành công (hiển thị "登録が完了しました。")
- **VITE_USE_MOCK=false**: Lỗi (hiển thị "登録処理でエラーが発生しました。")

## Nguyên nhân

Khi `VITE_USE_MOCK=false`, ứng dụng sẽ gọi API thật tới backend thay vì dùng mock data. Lỗi xảy ra có thể do:

### 1. **Backend không chạy hoặc không kết nối được**
   - Backend Java nằm ở `pos_renewal_frontend/pos_renewal_backend/WebAP/`
   - API endpoint: `/TY205/json/TY205_WTY20501TkyRnInsBC`
   - Kiểm tra xem backend có đang chạy không

### 2. **Biến môi trường VITE_API_BASE_URL chưa được cấu hình**
   
   **Cách kiểm tra:**
   - Trong file `pos_renewal_frontend/src/common/base/contextComponent.tsx` (dòng 104):
     ```typescript
     baseURL: import.meta.env.VITE_API_BASE_URL,
     ```
   
   **Cách fix:**
   - Tạo file `.env` hoặc `.env.local` trong thư mục `pos_renewal_frontend/`:
     ```env
     VITE_USE_MOCK=false
     VITE_API_BASE_URL=http://localhost:8080/WebAP
     PORT=5173
     ```
   
   - Hoặc tạo file `.env.test` cho môi trường test:
     ```env
     VITE_USE_MOCK=false
     VITE_API_BASE_URL=http://your-backend-server:port/WebAP
     BASE_URL=http://localhost:5173
     DEFAULT_CIPHER=LOCAL_DEV_DUMMY_KEY
     ```

### 3. **Database thật thiếu dữ liệu hoặc validation lỗi**
   
   Backend trả về lỗi `resultKbn !== '0'` trong response. Kiểm tra:
   - Database có dữ liệu `jznuridenNo` và `jznuridenHkkDate` từ `cartHeader` không?
   - Các field bắt buộc có đầy đủ không?
   - CommonData trong IndexedDB có đúng không?

### 4. **API Request thiếu dữ liệu hoặc sai format**
   
   API yêu cầu request format:
   ```json
   {
     "inDS": {
       "commonDT": [{
         "unyoDate": "...",
         "storeCd": "...",
         "syoriStoreCd": "...",
         "userId": "...",
         "clientId": "...",
         "termNo": "...",
         "screenId": "WTY20501"
       }],
       "tkyRnInDT": [{
         "jznuridenNo": "...",
         "jznuridenHkkDate": "...",
         "mmrCstmNmKnj": "...",
         "mmrCstmNmKn": "...",
         "nnyOtdkYoteiDate": "...",
         "keishoKbn": "...",
         "shHou": "...",
         "tkyRn": "..."
       }]
     }
   }
   ```

## Các bước khắc phục

### Bước 1: Tạo file cấu hình môi trường

**File: `pos_renewal_frontend/.env.local`**
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/WebAP
VITE_USE_MOCK=false

# Port Configuration  
PORT=5173

# Other configs
VITE_ENABLE_REACT_PROFILING=false
```

### Bước 2: Kiểm tra Backend đang chạy

1. Kiểm tra backend có chạy tại `http://localhost:8080` không
2. Test API endpoint trực tiếp:
   ```powershell
   curl -X POST http://localhost:8080/WebAP/TY205/json/TY205_WTY20501TkyRnInsBC `
     -H "Content-Type: application/json" `
     -d '{
       "inDS": {
         "commonDT": [{
           "unyoDate": "20250106",
           "storeCd": "0001",
           "syoriStoreCd": "0001",
           "userId": "TEST",
           "clientId": "CLIENT01",
           "termNo": "001",
           "screenId": "WTY20501"
         }],
         "tkyRnInDT": [{
           "jznuridenNo": "12345",
           "jznuridenHkkDate": "20250106",
           "mmrCstmNmKnj": "山田太郎",
           "mmrCstmNmKn": "ヤマダタロウ",
           "nnyOtdkYoteiDate": "20250110",
           "keishoKbn": "0",
           "shHou": "0",
           "tkyRn": "テスト摘要"
         }]
       }
     }'
   ```

### Bước 3: Kiểm tra Database

Đảm bảo database có:
- Bảng để lưu thông tin summary (摘要欄)
- Schema phù hợp với request format
- Constraint và validation rules không block insert

### Bước 4: Kiểm tra Test Data

File test data tại `tests/fixtures/` cần có đầy đủ:
- `sessionData`: Thông tin session
- `commonData`: CommonData từ IndexedDB
- `cartHeader`: Header info với `jznuridenNo` và `jznuridenHkkDate`
- `formData`: Dữ liệu form nhập vào

### Bước 5: Debug Response từ Backend

Thêm log để xem response chi tiết:

**File: `pos_renewal_frontend/src/features/TY205/WTY20501/hooks/use-ty20501-commit.ts`**

Tại dòng 108, thêm log:
```typescript
const response = await post(
  CommonApiPathConst.TY205_WTY20501TkyRnInsBC,
  request
)

// Thêm log này
console.log('[DEBUG] Full response:', JSON.stringify(response, null, 2))

const outDS = (response as any)?.outDS
```

## Cách chạy test với backend thật

### Trong Playwright test:

1. Đảm bảo backend đang chạy
2. Set environment variable:
   ```powershell
   $env:VITE_USE_MOCK="false"
   $env:VITE_API_BASE_URL="http://localhost:8080/WebAP"
   ```

3. Chạy test:
   ```powershell
   cd d:\project_vti2_auto_test\Playwright
   npx playwright test tests/modules/TY205/WTY20501/wty20501-insert.spec.ts
   ```

## Tóm tắt checklist

- [ ] File `.env.local` đã tạo với `VITE_API_BASE_URL` đúng
- [ ] Backend Java đang chạy
- [ ] Database có sẵn và schema đúng
- [ ] Test data có đầy đủ `sessionData`, `commonData`, `cartHeader`
- [ ] API endpoint `/TY205/json/TY205_WTY20501TkyRnInsBC` hoạt động
- [ ] Response từ backend có format đúng với `outDS.resultDT[0].resultKbn`

## Liên hệ hỗ trợ

Nếu vẫn gặp lỗi, cung cấp:
1. Log từ console khi chạy test
2. Response JSON từ backend
3. Database error message (nếu có)

