/**
 * Validation error messages for WTY30301 (マルチＰＯＰ出力指示)
 */
export const WTY30301_VALIDATION_MESSAGES = {
  PRODUCT_DOES_NOT_MATCH: { message: '商品が一致しません。', msgId: 'TE5137' },
  OUTPUT_DATE_REQUIRED: { message: '出力日が入力されていません。', msgId: 'TE5147' },
  INVALID_DATE_FORMAT: { message: '日付形式が正しくありません。', msgId: 'TE5133' },
  PRODUCT_NOT_SEARCHED: { message: '商品が検索されていません。', msgId: 'TE5147' },
  FINAL_PRICE_CANNOT_BE_ZERO: { message: '最終売価に0は入力できません。', msgId: 'TE5147' },
  LISTED_PRICE_CANNOT_BE_ZERO: { message: '掲載価格に0は入力できません。', msgId: 'TE5147' },
  SIZE_REQUIRED: { message: 'サイズを選択してください。', msgId: 'TE5132' },
  MULTI_COMMENT_REQUIRED: { message: 'マルチコメントを選択してください。', msgId: 'TE5132' },
  PRICE_MISMATCH: { message: '掲載価格と最終売価が一致しません。', msgId: 'TE5147' },
  LISTED_PRICE_MUST_BE_GREATER: { message: '掲載価格は最終売価より大きい必要があります。', msgId: 'TE5147' },
} as const;
