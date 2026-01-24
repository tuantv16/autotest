/**
 * Mock factory for WTY32101 API responses - Simple version
 */

// Common response structure
const COMMON_FIELDS = {
    createdDate: null,
    createdBy: null,
    createdProgramName: null,
    updatedDate: null,
    updatedBy: null,
    updatedProgramName: null,
    modifyCount: null,
    inDS: null,
    list: null,
    userInfo: null,
    modifyCountDouble: 0.0
};

// Common result templates
const SUCCESS_RESULT = {
    resultKbn: "0",
    msgID: "",
    msgArg1: "",
    msgArg2: "",
    msgArg3: "",
    msgArg4: "",
    msgArg5: ""
};

const ERROR_RESULT = (msgID: string, msgArg1 = "") => ({
    resultKbn: "1",
    msgID,
    msgArg1,
    msgArg2: "",
    msgArg3: "",
    msgArg4: "",
    msgArg5: ""
});

// Common data templates
const DEFAULT_SETTEI_INFO = {
    btenCd: "00644",
    kanriNo: "001",
    strDate: "",
    endDate: "",
    kadoFlg: "1",
    kanriTbl1: "10",
    kanriTbl2: "",
    htcycNo: 2
};

const SAMPLE_TNORS_HEAD = {
    mymDo: "201511",
    tnorsShijiNo: "10",
    btenCd: "00644",
    tnorsShijiMeiHyoji: "在庫属性テスト/10",
    tnorsShijiMei: "在庫属性テスト",
    tnorsJky: "02",
    ttlshnTnorsFlg: "0",
    tnorsSbt: "0",
    tnorsDate: "20241130",
    htcycNo: 3,
    tnorsKbn: "0",
    ttlSuCkkahiFlg: "0",
    trkmFlg: null
};

/**
 * Predefined mock responses
 */
export const MockResponses = {
    // Success case
    success: () => ({
        ...COMMON_FIELDS,
        outDS: {
            resultDT: [SUCCESS_RESULT],
            tnorsHeadDT: [SAMPLE_TNORS_HEAD],
            setteiInfoDT: [DEFAULT_SETTEI_INFO]
        }
    }),

    // Error: 棚卸情報が存在しません (TE5136)
    noInventoryInfo: () => ({
        ...COMMON_FIELDS,
        outDS: {
            resultDT: [ERROR_RESULT("TE5136", "棚卸情報")],
            tnorsHeadDT: [],
            setteiInfoDT: [DEFAULT_SETTEI_INFO]
        }
    }),

    // Error: システム環境設定マスタが存在しません
    // (Happens when kanriTbl1 is "00" instead of "10")
    noSystemConfig: () => ({
        ...COMMON_FIELDS,
        outDS: {
            resultDT: [SUCCESS_RESULT],
            tnorsHeadDT: [SAMPLE_TNORS_HEAD],
            setteiInfoDT: []
        }
    }),

    noTableMobileNotAllowed: () => ({
        ...COMMON_FIELDS, 
        outDS: {
            resultDT: [SUCCESS_RESULT],
            tnorsHeadDT: [SAMPLE_TNORS_HEAD],
            setteiInfoDT: [{
                ...DEFAULT_SETTEI_INFO, 
                kanriTbl1: "01" 
            }]
        }
    }), 

    tableMobileAllowed: () => ({
        ...COMMON_FIELDS, 
        outDS: {
            resultDT: [SUCCESS_RESULT],
            tnorsHeadDT: [SAMPLE_TNORS_HEAD],
            setteiInfoDT: [{
                ...DEFAULT_SETTEI_INFO, 
                kanriTbl1: "11" 
            }]
        }
    }), 

    unknownError: () => ({
        ...COMMON_FIELDS, 
        outDS: {
            resultDT: [],
            tnorsHeadDT: [],
            setteiInfoDT: []
        }
    }), 

    // Custom response builder
    custom: (overrides: any) => ({
        ...COMMON_FIELDS,
        outDS: {
            resultDT: [SUCCESS_RESULT],
            tnorsHeadDT: [],
            setteiInfoDT: [DEFAULT_SETTEI_INFO],
            ...overrides
        }
    })
};

/**
 * API endpoint patterns
 */
export const API_ENDPOINTS = {
    INIT: '**/WebAP/TY321/json/TY321_WTY32101InitBC*',
    GET_TNSB: '**/WebAP/TY321/json/TY321_WTY32101GetTnsbBC*',
    SHN_SELECT: '**/WebAP/TY321/json/TY321_WTY32101ShnSelectBC*'
};
