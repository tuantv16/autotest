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
} as const;

export const BUTTON_LABELS = {
  CONFIRM: '確定',
  CLEAR: 'クリア',
  CANCEL: 'キャンセル',
  OK: 'OK',
  YES: 'はい',
  NO: 'いいえ',
} as const;

