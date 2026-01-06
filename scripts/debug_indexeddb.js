const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const key = 'WTY20501_IN_SD';
  const value = {
    cartHeaderDT: [
      {
        jznuridenNo: '00102498019991',
        jznuridenHkkDate: '20250210',
        kokCd: 'C0001',
        uesamaFlg: '0',
        hbKbn: '1'
      }
    ]
  };

  await page.addInitScript(({ key, value }) => {
    const dbName = 'sessionLocalDB';
    const storeName = 'sessionData';
    const openReq = indexedDB.open(dbName);
    openReq.onupgradeneeded = function () {
      const db = openReq.result;
      if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName);
    };
    openReq.onsuccess = function () {
      try {
        const db = openReq.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.put(value, key);
        tx.oncomplete = function () { db.close(); };
      } catch (e) {}
    };
  }, { key, value });

  const url = 'http://localhost:5173/index.html?pilotkey=prod#/WTY20501SummaryInput';
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
  } catch (e) {
    console.error('goto failed', e.message);
  }

  const stored = await page.evaluate(async () => {
    const dbName = 'sessionLocalDB';
    const storeName = 'sessionData';
    const key = 'WTY20501_IN_SD';
    return new Promise((res) => {
      const req = indexedDB.open(dbName);
      req.onsuccess = function () {
        const db = req.result;
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const getReq = store.get(key);
        getReq.onsuccess = function () { res(getReq.result || null); db.close(); };
        getReq.onerror = function () { res(null); db.close(); };
      };
      req.onerror = function () { res(null); };
    });
  });

  console.log('IndexedDB stored value:', JSON.stringify(stored, null, 2));

  await browser.close();
})();
