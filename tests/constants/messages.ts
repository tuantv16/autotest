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
  REQUIRED_FIELDS_MISSING: '必須項目が未入力です',
  HALF_WIDTH_REQUIRED: '半角で入力してください。',
  PLEASE_ENTER_FOLLOW_DATE: 'フォロー日を入力してください',
  FOLLOW_DATE_MUST_BE_BEFORE_OPERATION_DATE:
    'フォロー日は運用日以前の日付を入力してください',
  FOLLOW_COUNT_MUST_BE_1_OR_MORE: 'フォロー回数は1以上で入力してください',
  COMMENT_LENGTH_EXCEEDED: 'コメントは100バイト以内で入力してください',

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
  START_DATE_AFTER_END_DATE:
    '入荷予定期間終了日には入荷予定期間開始日以降の日付を入力してください。',

  HALF_WIDTH_REQUIRED: '半角で入力してください。',
  FULL_WIDTH_REQUIRED: '全角で入力してください。',
  INVALID_LATER_DATE: '以降の日付を入力してください。',
  INVALID_DATE_AFTER_REIWA_70: '令和70年以降になるため入力できません',
} as const;

/**
 * WTY23002 (見込み客照会) validation messages
 */
export const WTY23002_MESSAGES = {
  PROSPECT_TARGET_CODE_REQUIRED_4_DIGITS:
    '見込対象コードは4桁で入力してください',
  PROSPECT_TARGET_CODE_REQUIRED_6_DIGITS:
    '見込対象コードは6桁で入力してください',
  NO_DATA_FOUND: '該当データが存在しません。',
  INVALID_DATE_FORMAT: '日付の形式が正しくありません',
  INVALID_DATE_RANGE: '抽出期間の開始日は終了日以前を入力してください',
} as const;

export const WTY31101_MESSAGES = {
  TE5050: '必須入力項目です。',
  TE5097: '半角で入力してください。',
  TE5130: '移動数を入力してください。',
  TE5134: '移動数にマイナスの値は入力できません。',
  TE5096: '商品コードまたはJANコードを入力してください。',
  TE5147: '同一の移動元、移動先を指定することはできません。',
  TE5137: '移動元区分を選択してください。',
  TE5137_1: '移動先区分を選択してください。',
  TE5130_1: '移動先に不良を選択している場合は、仕入先を入力してください。',
  TE5096_1: '商品コードまたはJANコードを入力してください。',
  slipNo_SET_KBN_S: 'セット商品ため、指定できません。',
  SHK_IG_KBN_1: 'グロス商品ため、指定できません。',
} as const;

export const WTY30303 = {
  TITLE: 'セール選択',
  CONFIRM: '確定',
  NOTICE_PRINTED: '青色のセールは印刷指示済です',
  NO_DATA: 'セールが存在しません。',
  PARAM_ERROR: 'パラメータ不正（部店コード）が誤っています。',
  MULTI_POP_TITLE: 'マルチＰＯＰ出力指示',

  // Sale-specific texts used in tests
  SALE_NEW_YEAR: '新春セール',
  PERIOD_SAMPLE: '2026/01/01　～　2026/01/31',
  MULTI_COMMENT_ZUBARI: 'ズバリ',
  MULTI_COMMENT_INPRO: 'インプロ',
} as const;
