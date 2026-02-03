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
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

