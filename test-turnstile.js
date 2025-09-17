#!/usr/bin/env node

// Test script to verify Turnstile export functionality
// Usage: node test-turnstile.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Turnstile Export Test Instructions');
console.log('=====================================');
console.log('');
console.log('📋 Test Steps:');
console.log('1. Open http://localhost:3001 in your browser');
console.log('2. Search for a username (e.g., "test123")');
console.log('3. Wait for results to load');
console.log('4. Try exporting results 4 times:');
console.log('   - First 3 exports should work WITHOUT verification');
console.log('   - 4th export should trigger Turnstile verification');
console.log('5. Complete Turnstile verification');
console.log('6. Check if download works without infinite loop');
console.log('');
console.log('🎯 Expected Behavior:');
console.log('✅ First 3 exports: Direct download (no verification)');
console.log('✅ 4th+ exports: Shows Turnstile modal');
console.log('✅ After verification: Downloads without restarting verification');
console.log('✅ Error states: Shows "Retry" button instead of auto-retry');
console.log('');
console.log('🐛 Fixed Issues:');
console.log('❌ Infinite verification loop');
console.log('❌ Auto-retry on failure');
console.log('❌ Missing environment variables');
console.log('');
console.log('🔍 Debug Information:');
console.log('- Check browser console for debug logs');
console.log('- Look for "Turnstile verification" messages');
console.log('- Verify API calls to /api/verify-turnstile');
console.log('');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('Press Enter to start testing, or type "skip" to exit:');
  const response = await askQuestion('> ');
  
  if (response.toLowerCase() === 'skip') {
    console.log('Test skipped.');
    rl.close();
    return;
  }

  console.log('\n🚀 Starting test...');
  console.log('1. Opening browser to http://localhost:3001');
  
  // Try to open browser
  const { exec } = require('child_process');
  const platform = process.platform;
  
  let command;
  if (platform === 'darwin') {
    command = 'open http://localhost:3001';
  } else if (platform === 'win32') {
    command = 'start http://localhost:3001';
  } else {
    command = 'xdg-open http://localhost:3001';
  }
  
  exec(command, (error) => {
    if (error) {
      console.log('❌ Could not open browser automatically');
      console.log('Please manually open: http://localhost:3001');
    } else {
      console.log('✅ Browser opened');
    }
  });

  console.log('\n📝 Follow the test steps above and report results:');
  
  const result1 = await askQuestion('2. Did first export work without verification? (y/n): ');
  const result2 = await askQuestion('3. Did second export work without verification? (y/n): ');
  const result3 = await askQuestion('4. Did third export work without verification? (y/n): ');
  const result4 = await askQuestion('5. Did fourth export show Turnstile verification? (y/n): ');
  const result5 = await askQuestion('6. After verification, did download work without restart? (y/n): ');

  console.log('\n📊 Test Results Summary:');
  console.log(`First 3 exports (no verification): ${result1 === 'y' && result2 === 'y' && result3 === 'y' ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`4th export (shows verification): ${result4 === 'y' ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Post-verification download: ${result5 === 'y' ? '✅ PASS' : '❌ FAIL'}`);

  const allPassed = result1 === 'y' && result2 === 'y' && result3 === 'y' && result4 === 'y' && result5 === 'y';
  
  console.log(`\n🎉 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (!allPassed) {
    console.log('\n🔧 Troubleshooting:');
    console.log('- Check browser console for error messages');
    console.log('- Verify environment variables are set');
    console.log('- Check server logs for API errors');
  }

  rl.close();
}

main().catch(console.error);