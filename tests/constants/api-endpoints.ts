/**
 * API Endpoints Constants
 * Centralized location for all API endpoints used in tests
 */

export const API_ENDPOINTS = {
  // TY104 - Store Inventory Inquiry (店別在庫照会)
  TY104_WTY10411ZaiInfoGetBC: 'TY104_WTY10411ZaiInfoGetBC',
  TY207_WTY20701GetThiChBC: 'TY207_WTY20701GetThiChBC',
  TY207_WTY20702GetThiJsBC: 'TY207_WTY20702GetThiJsBC',
  TY206_WTY20601InitBC: 'TY206_WTY20601InitBC',
  TZ108_WTZ10801TanInfoBC: 'TZ108_WTZ10801TanInfoBC',
  TZ203_TZCbrFindCallBC: 'TZ203_TZCbrFindCallBC',
  TZ204_TZSbrFindCallBC: 'TZ204_TZSbrFindCallBC',
  TZ112_TZReturnKokInfoBC: 'TZ112_TZReturnKokInfoBC',
  TY230_WTY23002UpdateBC: 'TY230_WTY23002UpdateBC',
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
