// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


const config = ({
  testDir: './tests',
  retries: 2,
  

  reporter: 'html',
  timeout: 100000,
  
 use: {
  browserName : 'chromium',
  headless : false,
  screenshot : 'on',
  trace: 'on',
  video: 'on',
 },
  
    


  
});
module.exports = config;
