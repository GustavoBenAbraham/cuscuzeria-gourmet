import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests', testMatch:'github-pages.spec.ts',workers:1,
 use:{baseURL:'http://127.0.0.1:4180',launchOptions:{channel:'chrome'},headless:true},
 webServer:{command:'node scripts/preview-pages.mjs',url:'http://127.0.0.1:4180/cuscuzeria-gourmet-site/',reuseExistingServer:false},reporter:'list'
});
