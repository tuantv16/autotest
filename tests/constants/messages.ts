/**
 * Common Messages Constants
 * Centralized location for all UI messages used in tests
 */

export const COMMON_MESSAGES = {
  // Success messages
  REGISTRATION_COMPLETED: '登録が完了しました。',
  SAVE_COMPLETED: '保存しました',
  UPDATE_COMPLETED: '更新しました',
  DELETE_COMPLETED: '削除しました',

  // Error messages
  VALIDATION_ERROR: '入力内容に誤りがあります',
  REQUIRED_FIELD: '必須項目です',
  HALF_WIDTH_REQUIRED: '半角で入力してください。',

  // Confirmation messages
  CONFIRM_SAVE: '保存しますか？',
  CONFIRM_DELETE: '削除しますか？',
  CONFIRM_CANCEL: 'キャンセルしますか？',

  ERROR_MESSAGE_ADD_CART: '商品が指定されていません。商品を指定してください',
} as const;

export const BUTTON_LABELS = {
  CONFIRM: '確定',
  CLEAR: 'クリア',
  CANCEL: 'キャンセル',
  OK: 'OK',
  YES: 'はい',
  NO: 'いいえ',
} as const;

export const VALIDATION_ERROR_MESSAGES = {
  REQUIRED_FIELD: '必須入力エラー',
  INVALID_LENGTH: '商品の桁数が正しくありません',
} as const;

/**
 * Column name constants for WTY30302 (マルチPOP出力指示一覧)
 */
export const WTY30302_COLUMN_NAMES = {
  MODEL_NUMBER: '型番',
  SIZE: 'サイズ',
  QUANTITY: '枚数',
  MULTI_COMMENT: 'マルチコメント',
  SALE_NAME: 'セール名',
} as const;

