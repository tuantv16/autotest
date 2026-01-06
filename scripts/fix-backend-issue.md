# 🔧 Hướng dẫn khắc phục lỗi save với Database thật

## Vấn đề hiện tại
Khi `VITE_USE_MOCK=false`, API gọi tới backend thật nhưng bị lỗi:
```
登録処理でエラーが発生しました。
(Lỗi trong quá trình đăng ký)
```

## Các bước khắc phục

### ✅ Bước 1: Kiểm tra Backend có đang chạy không

#### Cách 1: Dùng script kiểm tra
```powershell
cd d:\project_vti2_auto_test\Playwright
node scripts/check-backend.js
```

#### Cách 2: Kiểm tra thủ công
```powershell
# Kiểm tra port 8080 có process nào đang chạy không
netstat -ano | findstr :8080
```

#### Cách 3: Test bằng curl
```powershell
curl -X POST http://localhost:8080/WebAP/TY205/json/TY205_WTY20501TkyRnInsBC `
  -H "Content-Type: application/json" `
  -d '{"inDS":{"commonDT":[{"unyoDate":"20250106","storeCd":"0001","syoriStoreCd":"0001","userId":"TEST","clientId":"CLIENT01","termNo":"001","screenId":"WTY20501"}],"tkyRnInDT":[{"jznuridenNo":"12345","jznuridenHkkDate":"20250106","mmrCstmNmKnj":"山田太郎","mmrCstmNmKn":"ヤマダタロウ","nnyOtdkYoteiDate":"20250110","keishoKbn":"0","shHou":"0","tkyRn":"テスト"}]}}'
```

### ✅ Bước 2: Cấu hình đúng Backend URL

#### File: `pos_renewal_frontend/.env.development`
```env
# URL của backend (cập nhật cho đúng)
VITE_API_BASE_URL=http://localhost:8080/WebAP

# Tắt mock mode để dùng backend thật
VITE_USE_MOCK=false

# Port frontend
PORT=5173
```

**Quan trọng:** Nếu backend chạy ở port khác, hãy cập nhật URL cho đúng.

### ✅ Bước 3: Khởi động Backend (nếu chưa chạy)

Backend Java nằm ở: `pos_renewal_frontend/pos_renewal_backend/WebAP/`

```powershell
# Di chuyển vào thư mục backend
cd pos_renewal_frontend/pos_renewal_backend/WebAP

# Khởi động backend (tuỳ setup của bạn)
# Ví dụ với Tomcat:
# catalina.bat start

# Hoặc dùng Maven:
# mvn spring-boot:run

# Hoặc chạy JAR file:
# java -jar target/WebAP.jar
```

### ✅ Bước 4: Debug Response từ Backend

Tôi đã thêm logging vào file `use-ty20501-commit.ts`. Khi bạn chạy test/app, hãy xem console log:

```javascript
[DEBUG] Sending request to backend: {...}
[DEBUG] Full response from backend: {...}
[DEBUG] Parsed resultDT: {...}
```

#### Phân tích Response:

**Nếu `resultKbn = '0'`** → ✅ Thành công
**Nếu `resultKbn != '0'`** → ❌ Có lỗi, xem `msgID` và `message`

Các lỗi phổ biến:
- `msgID: "MSE00001"` → Database connection failed
- `msgID: "MSE00002"` → Validation failed
- `msgID: "MSE00003"` → Duplicate key
- `msgID: "MSE00004"` → Required field missing

### ✅ Bước 5: Kiểm tra Database

Backend cần kết nối được với database và có các bảng cần thiết.

#### Các bảng liên quan (ví dụ):
- `TBL_JZN_URITDEN` - Bảng phiếu bán
- `TBL_TKYRAN` - Bảng thông tin summary/摘要欄
- `TBL_COMMON_DATA` - Dữ liệu common

#### Kiểm tra:
```sql
-- Kiểm tra xem record có tồn tại không
SELECT * FROM TBL_JZN_URITDEN 
WHERE JZNURIDEN_NO = '12345' 
  AND JZNURIDEN_HKK_DATE = '20250106';
```

### ✅ Bước 6: Test Data đầy đủ

Đảm bảo test data có đủ thông tin:

```json
{
  "sessionData": {
    "key": "cartHeader",
    "value": {
      "jznuridenNo": "12345",        // ⚠️ Phải tồn tại trong DB
      "jznuridenHkkDate": "20250106" // ⚠️ Phải tồn tại trong DB
    }
  },
  "commonData": {
    "id": "common_data",
    "value": {
      "unyoDate": "20250106",
      "storeCd": "0001",
      "syoriStoreCd": "0001",
      "userId": "TEST_USER",
      "clientId": "CLIENT01",
      "termNo": "001"
    }
  }
}
```

### ✅ Bước 7: Restart lại Frontend

Sau khi thay đổi `.env` file:

```powershell
# Stop frontend (Ctrl+C)

# Clear cache và restart
cd pos_renewal_frontend
npm run dev
```

## 🐛 Debugging Checklist

- [ ] Backend đang chạy và trả về response
- [ ] `VITE_API_BASE_URL` được cấu hình đúng
- [ ] Database có sẵn và kết nối được
- [ ] Test data có `jznuridenNo` và `jznuridenHkkDate` hợp lệ
- [ ] Console log hiển thị request/response đầy đủ
- [ ] Response có `resultKbn = '0'` (success)

## 🔍 Xem Log chi tiết

### Browser Console (F12):
```
[DEBUG] Sending request to backend: { inDS: {...} }
[DEBUG] Full response from backend: { outDS: {...} }
[DEBUG] Parsed resultDT: { resultKbn: "1", msgID: "...", ... }
```

### Backend Log:
Kiểm tra log file của backend để xem lỗi chi tiết:
- Tomcat: `logs/catalina.out`
- Spring Boot: Console output
- Database: Query execution log

## 💡 Giải pháp tạm thời

Nếu backend chưa sẵn sàng, dùng mock mode:

```env
# File: .env.development
VITE_USE_MOCK=true
```

Sau đó test với mock data cho đến khi backend ready.

## 📞 Cần trợ giúp thêm?

Nếu vẫn gặp lỗi, cung cấp:
1. Console log từ browser
2. Response JSON từ backend
3. Backend log/error message
4. Database schema của bảng TBL_TKYRAN

