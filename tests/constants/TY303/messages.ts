/**
 * Validation error messages for WTY30301 (マルチＰＯＰ出力指示)
 */
export const WTY30301_VALIDATION_MESSAGES = {
  PRODUCT_DOES_NOT_MATCH: '商品が一致しません。',
  OUTPUT_DATE_REQUIRED: '出力日が入力されていません。',
  INVALID_DATE_FORMAT: '日付形式が正しくありません。',
  PRODUCT_NOT_SEARCHED: '商品が検索されていません。',
  FINAL_PRICE_CANNOT_BE_ZERO: '最終売価に0は入力できません。',
  LISTED_PRICE_CANNOT_BE_ZERO: '掲載価格に0は入力できません。',
  SIZE_REQUIRED: 'サイズを選択してください。',
  MULTI_COMMENT_REQUIRED: 'マルチコメントを選択してください。',
  PRICE_MISMATCH: '掲載価格と最終売価が一致しません。',
  LISTED_PRICE_MUST_BE_GREATER: '掲載価格は最終売価より大きい必要があります。',
} as const;
