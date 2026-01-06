-- ============================================================================
-- Script tạo test data cho WTY20501 (Summary Input)
-- Database: Oracle / PostgreSQL / MySQL (adjust syntax as needed)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Xóa test data cũ (nếu có)
-- ----------------------------------------------------------------------------
DELETE FROM TBL_TKYRAN 
WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992');

DELETE FROM TBL_JZN_URIDEN 
WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992');

COMMIT;

-- ----------------------------------------------------------------------------
-- 2. Tạo phiếu bán trước test (TC_01)
-- ----------------------------------------------------------------------------
INSERT INTO TBL_JZN_URIDEN (
    JZNURIDEN_NO,           -- Số phiếu bán trước
    JZNURIDEN_HKK_DATE,     -- Ngày phát hành
    KOK_CD,                 -- Mã khách hàng
    UESAMA_FLG,             -- Flag 様/御中
    HB_KBN,                 -- Phân loại
    STORE_CD,               -- Mã cửa hàng
    SYORI_STORE_CD,         -- Mã cửa hàng xử lý
    UNYO_DATE,              -- Ngày vận hành
    USER_ID,                -- User tạo
    STATUS,                 -- Trạng thái (0=editable, 1=locked)
    CREATED_DATE,           -- Ngày tạo
    UPDATED_DATE            -- Ngày cập nhật
) VALUES (
    '00102498019991',       -- Test ID 1
    '20250210',             -- 2025/02/10
    'C0001',                -- Test customer
    '0',                    -- 様
    '1',                    -- Type 1
    'C0001',                -- Test store
    'C0001',                -- Test store
    '20250210',             -- Operation date
    'testuser',             -- Test user
    '0',                    -- Editable
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 3. Tạo phiếu bán trước test (TC_02)
-- ----------------------------------------------------------------------------
INSERT INTO TBL_JZN_URIDEN (
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    KOK_CD,
    UESAMA_FLG,
    HB_KBN,
    STORE_CD,
    SYORI_STORE_CD,
    UNYO_DATE,
    USER_ID,
    STATUS,
    CREATED_DATE,
    UPDATED_DATE
) VALUES (
    '00102498019992',       -- Test ID 2
    '20250215',             -- 2025/02/15
    'C0002',                -- Test customer 2
    '0',                    -- 様
    '2',                    -- Type 2
    'C0002',                -- Test store 2
    'C0002',                -- Test store 2
    '20250215',             -- Operation date
    'testuser2',            -- Test user 2
    '0',                    -- Editable
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

COMMIT;

-- ----------------------------------------------------------------------------
-- 4. Verify test data created
-- ----------------------------------------------------------------------------
SELECT 
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    KOK_CD,
    STATUS,
    CREATED_DATE
FROM TBL_JZN_URIDEN
WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992')
ORDER BY JZNURIDEN_NO;

-- Expected result: 2 rows

-- ----------------------------------------------------------------------------
-- 5. Additional test data (nếu cần table khác)
-- ----------------------------------------------------------------------------

-- Nếu cần tạo customer test:
-- INSERT INTO TBL_CUSTOMER (
--     KOK_CD,
--     KOK_NM_KNJ,
--     KOK_NM_KN,
--     STORE_CD
-- ) VALUES (
--     'C0001',
--     '山田太郎',
--     'ヤマダタロウ',
--     'C0001'
-- );

-- Nếu cần tạo store test:
-- INSERT INTO TBL_STORE (
--     STORE_CD,
--     STORE_NM_KNJ,
--     STATUS
-- ) VALUES (
--     'C0001',
--     'テスト店舗',
--     '1'
-- );

COMMIT;

-- ============================================================================
-- Cleanup script (chạy sau khi test xong)
-- ============================================================================

-- DELETE FROM TBL_TKYRAN 
-- WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992');
-- 
-- DELETE FROM TBL_JZN_URIDEN 
-- WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992');
-- 
-- COMMIT;

