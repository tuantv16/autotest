-- Xóa cứng dữ liệu test RA101 (Retail App) khỏi bảng products.
--
-- Test đã tự xóa sản phẩm qua UI ở afterEach, nhưng Product của Retail App dùng SoftDeletes
-- nên row vẫn nằm lại trong DB với deleted_at != NULL. Script này dọn nốt phần đó.
-- Chỉ đụng đến row đã bị xóa mềm VÀ có SKU theo đúng prefix trong fixture tests/fixtures/RA101/wra10102.json.
--
-- Cách chạy (app chạy bằng docker-compose của retail_app):
--   docker exec -i retail_mysql mysql -ularavel -psecret laravel < scripts/cleanup-retail-test-data.sql
--
-- Kiểm tra trước khi xóa:
--   SELECT id, sku, name, deleted_at FROM products
--   WHERE deleted_at IS NOT NULL
--     AND (sku LIKE 'AUTO-SKU-%' OR sku LIKE 'DUP-SKU-%' OR sku LIKE 'OVER-PRICE-%');

DELETE FROM products
WHERE deleted_at IS NOT NULL
  AND (
    sku LIKE 'AUTO-SKU-%'
    OR sku LIKE 'DUP-SKU-%'
    OR sku LIKE 'OVER-PRICE-%'
  );
