/**
 * IndexedDB Helper
 * Utility functions for managing IndexedDB in tests
 */

import { Page } from '@playwright/test';

export interface SessionDataPayload {
  key: string;
  value: any;
}

export interface CommonDataPayload {
  id: string;
  value: any;
}

export interface ModeFlgDataPayload {
  key: string;
  value: any;
}

export interface InitializeDBOptions {
  sessionData?: SessionDataPayload;
  commonData?: CommonDataPayload[]; // Only support array
  modeFlgData?: ModeFlgDataPayload;
  cipher?: string;
}

export class IndexedDBHelper {
  constructor(private page: Page) { }

  /**
   * Initialize IndexedDB with session and common data - Direct injection
   */
  async initializeDB(options: InitializeDBOptions): Promise<void> {
    const { sessionData, commonData, modeFlgData, cipher } = options;
    const defaultCipher = cipher || 'LOCAL_DEV_DUMMY_KEY';

    // Convert modeFlgData to commonData format if provided
    const allCommonData = [...(commonData || [])];
    if (modeFlgData) {
      allCommonData.push({
        id: 'modeFlg',
        value: modeFlgData.value
      });
    }

    if (!sessionData && allCommonData.length === 0) {
      console.warn('No data provided to initialize');
      return;
    }

    await this.page.evaluate(
      async ({ sessionDataKey, sessionDataValue, commonDataList, cipherKey, hasSessionData, hasCommonData }) => {
        try {

          // Set cipher in localStorage
          localStorage.setItem('cipher', cipherKey);

          // Load CryptoJS if needed
          if (!(window as any).CryptoJS) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
              script.onload = () => resolve(undefined);
              script.onerror = () => reject(new Error('Failed to load CryptoJS'));
              document.head.appendChild(script);
            });
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for script to load
          }

          const CryptoJS = (window as any).CryptoJS;
          if (!CryptoJS || !CryptoJS.AES) {
            throw new Error('CryptoJS not available');
          }

          // Delete existing DB
          await new Promise<void>((resolve) => {
            const deleteReq = indexedDB.deleteDatabase('sessionLocalDB');
            deleteReq.onsuccess = () => {
              console.log('[INIT] Deleted existing database');
              resolve();
            };
            deleteReq.onerror = () => resolve();
            deleteReq.onblocked = () => {
              console.warn('[INIT] Database deletion blocked');
              resolve();
            };
          });

          await new Promise(resolve => setTimeout(resolve, 100));

          // Open DB
          const db = await new Promise<IDBDatabase>((resolve, reject) => {
            const req = indexedDB.open('sessionLocalDB', 1);
            req.onsuccess = () => {
              console.log('[INIT] Database opened');
              resolve(req.result);
            };
            req.onerror = () => reject(req.error);
            req.onupgradeneeded = (event) => {
              console.log('[INIT] Creating object stores');
              const db = (event.target as any).result;
              if (!db.objectStoreNames.contains('sessionData')) {
                db.createObjectStore('sessionData', { keyPath: 'sessionDataId' });
              }
              if (!db.objectStoreNames.contains('commonData')) {
                db.createObjectStore('commonData', { keyPath: 'id' });
              }
            };
          });

          // Encrypt and insert sessionData if provided
          if (hasSessionData) {
            // Format must match session_data.ts: { sessionDataId: key, sessionData: JSON.stringify(value) }
            const recordToEncrypt = {
              sessionDataId: sessionDataKey,
              sessionData: JSON.stringify(sessionDataValue)
            };
            const plainText = JSON.stringify(recordToEncrypt);
            console.log('[INIT] Encrypting sessionData with cipher:', cipherKey.substring(0, 20) + '...');
            const encryptedValue = CryptoJS.AES.encrypt(plainText, cipherKey).toString();
            console.log('[INIT] Encrypted sessionData length:', encryptedValue.length);

            await new Promise<void>((resolve, reject) => {
              const tx = db.transaction('sessionData', 'readwrite');
              const store = tx.objectStore('sessionData');
              const record = { sessionDataId: sessionDataKey, value: encryptedValue };

              // Set transaction handlers BEFORE making the request
              tx.oncomplete = () => {
                console.log('[INIT] SessionData transaction completed:', sessionDataKey);
                resolve();
              };
              tx.onerror = () => {
                console.error('[INIT] SessionData transaction error:', tx.error);
                reject(tx.error);
              };
              tx.onabort = () => {
                console.error('[INIT] SessionData transaction aborted:', tx.error);
                reject(tx.error || new Error('Transaction aborted'));
              };

              const req = store.put(record);
              req.onsuccess = () => {
                console.log('[INIT] SessionData put request succeeded:', sessionDataKey);
                // Transaction will complete automatically, oncomplete handler will resolve
              };
              req.onerror = () => {
                console.error('[INIT] SessionData put request failed:', req.error);
                reject(req.error);
              };
            });
          }

          // Encrypt and insert commonData if provided (support multiple records)
          if (hasCommonData && commonDataList.length > 0) {
            // Map record ID to field name in encrypted payload
            // This allows users to use friendly IDs like "commonDT" in test data
            // while storing with correct field names like "commonData"
            const FIELD_NAME_MAP: { [key: string]: string } = {
              'btnInfoDT': 'btnInfoData',
              'taxInfoDT': 'taxInfoData',
              'commonDT': 'commonData',
              'loginInfoDT': 'loginInfoData',
              'systemDT': 'systemData',
              'tanInfoDT': 'tanInfoData',
              'modeFlg': 'modeFlg',
              'preScreenId': 'preScreenId',
              'screenDT': 'screenDT',
              'screenId': 'screenId'
            };

            for (const commonDataItem of commonDataList) {
              const { id: commonDataId, value: commonDataValue } = commonDataItem;

              // Map id to fieldName (e.g., commonDT -> commonData)
              const fieldName = FIELD_NAME_MAP[commonDataId] || commonDataId;

              // Format must match common-data-store.ts: { id: recordId, [fieldName]: JSON.stringify(value) }
              const commonRecordToEncrypt = {
                id: commonDataId,
                [fieldName]: JSON.stringify(commonDataValue)
              };
              const commonPlainText = JSON.stringify(commonRecordToEncrypt);
              console.log('[INIT] Encrypting commonData:', commonDataId);
              const encryptedCommonValue = CryptoJS.AES.encrypt(commonPlainText, cipherKey).toString();
              console.log('[INIT] Encrypted commonData length:', encryptedCommonValue.length);

              await new Promise<void>((resolve, reject) => {
                const tx = db.transaction('commonData', 'readwrite');
                const store = tx.objectStore('commonData');
                const record = { id: commonDataId, value: encryptedCommonValue };

                // Set transaction handlers BEFORE making the request
                tx.oncomplete = () => {
                  console.log('[INIT] CommonData transaction completed:', commonDataId);
                  resolve();
                };
                tx.onerror = () => {
                  console.error('[INIT] CommonData transaction error:', tx.error);
                  reject(tx.error);
                };
                tx.onabort = () => {
                  console.error('[INIT] CommonData transaction aborted:', tx.error);
                  reject(tx.error || new Error('Transaction aborted'));
                };

                const req = store.put(record);
                req.onsuccess = () => {
                  console.log('[INIT] CommonData put request succeeded:', commonDataId);
                  // Transaction will complete automatically, oncomplete handler will resolve
                };
                req.onerror = () => {
                  console.error('[INIT] CommonData put request failed:', req.error);
                  reject(req.error);
                };
              });
            }
          }

          db.close();
          console.log('[INIT] Data injection completed successfully');
        } catch (e) {
          console.error('[INIT] Failed to inject data:', e);
          throw e;
        }
      },
      {
        sessionDataKey: sessionData?.key,
        sessionDataValue: sessionData?.value,
        commonDataList: allCommonData,
        cipherKey: defaultCipher,
        hasSessionData: !!sessionData,
        hasCommonData: allCommonData.length > 0
      }
    );
  }

  /**
   * Verify data exists in IndexedDB
   */
  async verifyData(storeName: string, key: string): Promise<any> {
    return await this.page.evaluate(
      async ({ storeName, key }) => {
        const dbName = 'sessionLocalDB';
        return new Promise((resolve) => {
          const req = indexedDB.open(dbName);
          req.onsuccess = function () {
            const db = req.result;
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const getReq = store.get(key);
            getReq.onsuccess = function () {
              resolve(getReq.result || null);
              db.close();
            };
            getReq.onerror = function () {
              resolve(null);
              db.close();
            };
          };
          req.onerror = function () {
            resolve(null);
          };
        });
      },
      { storeName, key }
    );
  }

  /**
   * Re-inject sessionData with cipher from localStorage
   */
  async reInjectWithCipher(
    sessionData: SessionDataPayload
  ): Promise<{ success: boolean; error?: string }> {
    return this.page.evaluate(
      async ({ sessionDataKey, sessionDataValue }) => {
        try {
          // Get cipher from localStorage (set by initializeDB)
          const cipher = localStorage.getItem('cipher');
          if (!cipher) {
            throw new Error('Cipher not found in localStorage');
          }
          console.log('[REINJECT] Using cipher from localStorage:', cipher.substring(0, 20) + '...');

          // Ensure CryptoJS is loaded
          if (!(window as any).CryptoJS) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src =
                'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
              script.onload = () => resolve(undefined);
              script.onerror = () => reject(new Error('Failed to load CryptoJS'));
              document.head.appendChild(script);
            });
          }

          const CryptoJS = (window as any).CryptoJS;
          if (!CryptoJS || !CryptoJS.AES) {
            throw new Error('CryptoJS.AES not available');
          }

          const db = await new Promise<IDBDatabase>((resolve, reject) => {
            const req = indexedDB.open('sessionLocalDB');
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
          });

          // Re-encrypt with cipher from localStorage (same format as initializeDB)
          // Format must match session_data.ts: { sessionDataId: key, sessionData: JSON.stringify(value) }
          const recordToEncrypt = {
            sessionDataId: sessionDataKey,
            sessionData: JSON.stringify(sessionDataValue)
          };
          const plainText = JSON.stringify(recordToEncrypt);
          const encryptedValue = CryptoJS.AES.encrypt(plainText, cipher).toString();

          await new Promise<void>((resolve, reject) => {
            const tx = db.transaction('sessionData', 'readwrite');
            const store = tx.objectStore('sessionData');
            const record = {
              sessionDataId: sessionDataKey,
              value: encryptedValue,
            };

            // Set transaction handlers BEFORE making the request
            tx.oncomplete = () => {
              console.log('[REINJECT] SessionData transaction completed:', sessionDataKey);
              resolve();
            };
            tx.onerror = () => {
              console.error('[REINJECT] SessionData transaction error:', tx.error);
              reject(tx.error);
            };
            tx.onabort = () => {
              console.error('[REINJECT] SessionData transaction aborted:', tx.error);
              reject(tx.error || new Error('Transaction aborted'));
            };

            const req = store.put(record);
            req.onsuccess = () => {
              console.log('[REINJECT] SessionData put request succeeded:', sessionDataKey);
              // Transaction will complete automatically, oncomplete handler will resolve
            };
            req.onerror = () => {
              console.error('[REINJECT] SessionData put request failed:', req.error);
              reject(req.error);
            };
          });

          db.close();
          console.log('[REINJECT] Data re-encrypted successfully');
          return { success: true };
        } catch (e) {
          console.error('[REINJECT] Failed to re-inject:', e);
          return { success: false, error: String(e) };
        }
      },
      {
        sessionDataKey: sessionData.key,
        sessionDataValue: sessionData.value
      }
    );
  }

  /**
   * Extract cipher from URL (same as working test)
   */
  extractCipherFromUrl(url: string, defaultCipher: string = 'LOCAL_DEV_DUMMY_KEY'): string {
    let cipher = defaultCipher;
    try {
      const urlObj = new URL(url);
      cipher = urlObj.searchParams.get('cipher') || cipher;
      // Also check in hash
      if (url.includes('cipher=')) {
        const cipherMatch = url.match(/cipher=([^&]+)/);
        if (cipherMatch) {
          cipher = decodeURIComponent(cipherMatch[1]);
        }
      }
    } catch (e) {
      console.warn('[TEST] Could not extract cipher from URL, using default');
    }
    return cipher;
  }

  /**
   * Debug cipher and IndexedDB data
   */
  async debugCipherAndData(): Promise<void> {
    const debugInfo = await this.page.evaluate(() => {
      return new Promise(async (resolve) => {
        const info: any = {
          cipher: localStorage.getItem('cipher'),
          localStorage: { ...localStorage },
          sessionData: null,
          commonData: null,
        };

        try {
          const db = await new Promise<IDBDatabase>((res, rej) => {
            const req = indexedDB.open('sessionLocalDB');
            req.onsuccess = () => res(req.result);
            req.onerror = () => rej(req.error);
          });

          // Get sessionData
          const sessionDataStore = db.transaction('sessionData', 'readonly').objectStore('sessionData');
          const sessionDataReq = sessionDataStore.getAll();
          info.sessionData = await new Promise((res) => {
            sessionDataReq.onsuccess = () => res(sessionDataReq.result);
            sessionDataReq.onerror = () => res(null);
          });

          // Get commonData
          const commonDataStore = db.transaction('commonData', 'readonly').objectStore('commonData');
          const commonDataReq = commonDataStore.getAll();
          info.commonData = await new Promise((res) => {
            commonDataReq.onsuccess = () => res(commonDataReq.result);
            commonDataReq.onerror = () => res(null);
          });

          db.close();
        } catch (e: any) {
          info.error = e.message;
        }

        resolve(info);
      });
    });

    console.log('[DEBUG] Cipher and IndexedDB Data:', JSON.stringify(debugInfo, null, 2));
  }

  /**
   * Clear all IndexedDB data
   */
  async clearDB(): Promise<void> {
    await this.page.evaluate(() => {
      indexedDB.deleteDatabase('sessionLocalDB');
    });
  }
}
