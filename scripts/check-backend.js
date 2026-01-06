/**
 * Script to check if backend is running and test API endpoint
 * Usage: node scripts/check-backend.js
 */

const http = require('http');

// Configuration - Update these values
const BACKEND_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_ENDPOINT = '/WebAP/TY205/json/TY205_WTY20501TkyRnInsBC';

// Test data matching your test case
const testData = {
  inDS: {
    commonDT: [{
      unyoDate: '20250106',
      storeCd: '0001',
      syoriStoreCd: '0001',
      userId: 'TEST_USER',
      clientId: 'CLIENT01',
      termNo: '001',
      screenId: 'WTY20501'
    }],
    tkyRnInDT: [{
      jznuridenNo: '12345',
      jznuridenHkkDate: '20250106',
      mmrCstmNmKnj: '山田太郎',
      mmrCstmNmKn: 'ヤマダタロウ',
      nnyOtdkYoteiDate: '20250110',
      keishoKbn: '0',
      shHou: '0',
      tkyRn: 'これはテストの摘要欄入力です'
    }]
  }
};

console.log('🔍 Checking backend connection...');
console.log(`Backend URL: ${BACKEND_URL}`);
console.log(`API Endpoint: ${API_ENDPOINT}\n`);

// Parse URL
const url = new URL(BACKEND_URL + API_ENDPOINT);
const postData = JSON.stringify(testData);

const options = {
  hostname: url.hostname,
  port: url.port || 80,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  },
  timeout: 5000
};

console.log('📤 Sending test request...\n');

const req = http.request(options, (res) => {
  console.log(`✅ Backend responded with status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}\n`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('📥 Response body:');
      console.log(JSON.stringify(response, null, 2));
      
      // Check result
      const resultDT = response?.outDS?.resultDT?.[0];
      if (resultDT) {
        console.log('\n📊 Result Analysis:');
        console.log(`- resultKbn: ${resultDT.resultKbn} ${resultDT.resultKbn === '0' ? '✅ Success' : '❌ Error'}`);
        console.log(`- resultCode: ${resultDT.resultCode}`);
        console.log(`- message: ${resultDT.message}`);
        if (resultDT.msgID) {
          console.log(`- msgID: ${resultDT.msgID}`);
        }
      }
    } catch (e) {
      console.log('⚠️  Response is not valid JSON:');
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Connection failed!');
  console.error(`Error: ${error.message}\n`);
  console.log('💡 Possible causes:');
  console.log('1. Backend is not running');
  console.log('2. Wrong backend URL or port');
  console.log('3. Network/firewall issue');
  console.log('4. Backend is running on HTTPS (use https module instead)\n');
  console.log('🔧 Solutions:');
  console.log('- Check if backend is running: netstat -ano | findstr :8080');
  console.log('- Update BACKEND_URL in this script');
  console.log('- Start backend server if not running');
});

req.on('timeout', () => {
  console.error('❌ Request timeout!');
  console.log('Backend is not responding. Check if it\'s running.');
  req.destroy();
});

req.write(postData);
req.end();

