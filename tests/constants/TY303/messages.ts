/**
 * constants for WTY30302 (マルチPOP出力指示一覧)
 */
export const WTY30302_COLUMN_NAMES = {
    MODEL_NUMBER: '型番',
    SIZE: 'サイズ',
    QUANTITY: '枚数',
    MULTI_COMMENT: 'マルチコメント',
    SALE_NAME: 'セール名',
} as const;

export const WTY30302_MESSAGES = {
    CONFIRM_DELETE: '選択中の印刷指示を削除しますか？',
} as const;
