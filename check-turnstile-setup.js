#!/usr/bin/env node

// Quick setup check for Turnstile configuration
console.log('🔍 Turnstile Setup Check');
console.log('========================');

// Check if .env.local exists and has Turnstile keys
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  const hasSiteKey = envContent.includes('NEXT_PUBLIC_TURNSTILE_SITE_KEY');
  const hasSecretKey = envContent.includes('TURNSTILE_SECRET_KEY');
  
  console.log(`${hasSiteKey ? '✅' : '❌'} NEXT_PUBLIC_TURNSTILE_SITE_KEY configured`);
  console.log(`${hasSecretKey ? '✅' : '❌'} TURNSTILE_SECRET_KEY configured`);
  
  if (hasSiteKey && hasSecretKey) {
    console.log('✅ Turnstile environment variables are set');
  } else {
    console.log('❌ Missing Turnstile environment variables');
    console.log('📝 Add these to your .env.local file:');
    console.log('NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here');
    console.log('TURNSTILE_SECRET_KEY=your_secret_key_here');
  }
} else {
  console.log('❌ .env.local file not found');
  console.log('📝 Create .env.local with:');
  console.log('NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here');
  console.log('TURNSTILE_SECRET_KEY=your_secret_key_here');
}

console.log('\n🔧 Export Count Settings:');
console.log('- Free exports before verification: 3');
console.log('- Verification required from: 4th export onwards');

console.log('\n🚀 Test URL: http://localhost:3001');

// Check useExportCount settings
const useExportCountPath = path.join(__dirname, 'lib', 'hooks', 'useExportCount.ts');
if (fs.existsSync(useExportCountPath)) {
  const content = fs.readFileSync(useExportCountPath, 'utf8');
  if (content.includes('count >= 3')) {
    console.log('✅ Export count threshold set to 3 (correct)');
  } else {
    console.log('❌ Export count threshold not set correctly');
  }
}

console.log('\n🎯 Ready for testing!');