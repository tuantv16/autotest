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
  ERROR_FLUTTER_DEVICE: 'スキャナーはFlutterアプリ内でのみ動作します',
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
  START_DATE_AFTER_END_DATE: '入荷予定期間終了日には入荷予定期間開始日以降の日付を入力してください。',
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

export const WTY11001_headerTables = [
   'No', 
   'JANコード', 
   '発注数', 
   '予定数',
   '入予定日', 
   '型番', 
   '入荷状態区分', 
   'メーカ名', 
   '発注/指示番号'
]

export const WTY11001_ERROR_MESSAGES = {
  SLIP_NO_LENGTH_14_MOBIE: '移動依頼番号は半角14文字で入力してください。',
  SLIP_NO_LENGTH_14_SUPPLY: '売上伝票番号は半角14文字で入力してください。',
  SLIP_NO_ERROR: '客注以外とき、売上伝票番号は入力できません。',
  BRCD_LENGTH_ERROR: '分類コードは、２桁または４桁または６桁で入力してください。',
  DATA_NOT_FOUND: '該当データが存在しません。',
  DETAIL_NOT_SELECTED: '入荷予定を選択してください。',
} as const;
