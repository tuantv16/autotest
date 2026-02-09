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

export const WTY11002_INPUT_LABELS = [
  "入荷ルート", 
  "入荷理由", 
  "発注/指示番号", 
  "売上伝票番号", 
  "担当者コード", 
  "担当者名", 
  "JANコード", 
  "型番", 
  "商品名", 
  "メーカ", 
  "取引先", 
  "発注数", 
  "予定数", 
  "入予定日", 
  "状態区分", 
  "顧客コード", 
  "顧客名"
];
