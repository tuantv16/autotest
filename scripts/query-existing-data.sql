-- ============================================================================
-- Script query dữ liệu thật từ database để dùng cho test
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Tìm phiếu bán trước khả dụng (có thể edit)
-- ----------------------------------------------------------------------------
SELECT 
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    KOK_CD,
    UESAMA_FLG,
    HB_KBN,
    STORE_CD,
    STATUS,
    TO_CHAR(CREATED_DATE, 'YYYY-MM-DD HH24:MI:SS') AS CREATED_DATE
FROM TBL_JZN_URIDEN
WHERE 1=1
  AND STATUS = '0'                    -- Editable
  AND STORE_CD = 'C0001'              -- Adjust to your test store
  AND JZNURIDEN_HKK_DATE >= TO_CHAR(SYSDATE - 30, 'YYYYMMDD')  -- Last 30 days
ORDER BY JZNURIDEN_HKK_DATE DESC, CREATED_DATE DESC
FETCH FIRST 10 ROWS ONLY;           -- Top 10 (Oracle syntax)
-- For MySQL: LIMIT 10
-- For PostgreSQL: LIMIT 10

-- ----------------------------------------------------------------------------
-- 2. Check xem phiếu test có tồn tại không
-- ----------------------------------------------------------------------------
SELECT 
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    KOK_CD,
    STATUS,
    CASE 
        WHEN STATUS = '0' THEN 'Editable'
        WHEN STATUS = '1' THEN 'Locked'
        ELSE 'Unknown'
    END AS STATUS_NAME
FROM TBL_JZN_URIDEN
WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992');

-- If returns 0 rows → Need to create test data

-- ----------------------------------------------------------------------------
-- 3. Check summary đã được save chưa
-- ----------------------------------------------------------------------------
SELECT 
    JZNURIDEN_NO,
    JZNURIDEN_HKK_DATE,
    MMR_CSTM_NM_KNJ,        -- Tên khách hàng (Kanji)
    MMR_CSTM_NM_KN,         -- Tên khách hàng (Kana)
    NNY_OTDK_YOTEI_DATE,    -- Ngày giao hàng dự kiến
    KEISHO_KBN,             -- Cách xưng hô (0=様, 1=御中)
    SH_HOU,                 -- Phương thức thanh toán (0=現金, 1=振込)
    TKY_RN,                 -- Nội dung summary
    TO_CHAR(CREATED_DATE, 'YYYY-MM-DD HH24:MI:SS') AS CREATED_DATE,
    TO_CHAR(UPDATED_DATE, 'YYYY-MM-DD HH24:MI:SS') AS UPDATED_DATE
FROM TBL_TKYRAN
WHERE JZNURIDEN_NO IN ('00102498019991', '00102498019992')
ORDER BY CREATED_DATE DESC;

-- ----------------------------------------------------------------------------
-- 4. Tìm store code hợp lệ
-- ----------------------------------------------------------------------------
SELECT 
    STORE_CD,
    STORE_NM_KNJ,
    STATUS
FROM TBL_STORE
WHERE STATUS = '1'                  -- Active
  AND STORE_CD LIKE 'C%'            -- Test stores
ORDER BY STORE_CD
FETCH FIRST 5 ROWS ONLY;

-- ----------------------------------------------------------------------------
-- 5. Tìm customer code hợp lệ
-- ----------------------------------------------------------------------------
SELECT 
    KOK_CD,
    KOK_NM_KNJ,
    KOK_NM_KN,
    STORE_CD
FROM TBL_CUSTOMER
WHERE STORE_CD = 'C0001'            -- Adjust to your store
  AND KOK_CD LIKE 'C%'
ORDER BY KOK_CD
FETCH FIRST 5 ROWS ONLY;

-- ----------------------------------------------------------------------------
-- 6. Check table structure (để hiểu schema)
-- ----------------------------------------------------------------------------

-- Oracle:
-- SELECT 
--     COLUMN_NAME,
--     DATA_TYPE,
--     DATA_LENGTH,
--     NULLABLE
-- FROM USER_TAB_COLUMNS
-- WHERE TABLE_NAME = 'TBL_JZN_URIDEN'
-- ORDER BY COLUMN_ID;

-- MySQL:
-- DESCRIBE TBL_JZN_URIDEN;

-- PostgreSQL:
-- \d TBL_JZN_URIDEN;

-- ----------------------------------------------------------------------------
-- 7. Check constraints và foreign keys
-- ----------------------------------------------------------------------------

-- Oracle:
-- SELECT 
--     CONSTRAINT_NAME,
--     CONSTRAINT_TYPE,
--     SEARCH_CONDITION
-- FROM USER_CONSTRAINTS
-- WHERE TABLE_NAME = 'TBL_JZN_URIDEN';

-- MySQL:
-- SELECT 
--     CONSTRAINT_NAME,
--     CONSTRAINT_TYPE
-- FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
-- WHERE TABLE_NAME = 'TBL_JZN_URIDEN';

-- ----------------------------------------------------------------------------
-- 8. Count records by status
-- ----------------------------------------------------------------------------
SELECT 
    STATUS,
    COUNT(*) AS COUNT,
    CASE 
        WHEN STATUS = '0' THEN 'Editable'
        WHEN STATUS = '1' THEN 'Locked'
        ELSE 'Unknown'
    END AS STATUS_NAME
FROM TBL_JZN_URIDEN
GROUP BY STATUS
ORDER BY STATUS;

-- ============================================================================
-- How to use:
-- ============================================================================
-- 1. Chạy query #1 để tìm phiếu khả dụng
-- 2. Copy JZNURIDEN_NO và JZNURIDEN_HKK_DATE
-- 3. Update vào tests/fixtures/TY205/wty20501.json
-- 4. Hoặc chạy script setup-test-data.sql để tạo test data mới
-- ============================================================================

