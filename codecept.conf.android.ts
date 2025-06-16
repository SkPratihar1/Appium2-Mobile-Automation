import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// import { getAllureResultsDir } from './src/lib/util/report/getAllureResultsDir';

// const allureResultsDir = getAllureResultsDir();

import * as dotenv from 'dotenv'
dotenv.config()
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: "src/specs/**/*_test.ts",
  //tests: "src/spec/./*_test.ts",
  logLevel: "info",
  output: "./output",
  helpers: {
    Appium: {
      appiumV2: true,
      logLevel: 'debug',
      platform: "Android",
      device: 'sdk_gphone_x86',
      app: "/Users/it062305/dev/project/EroEV-Mobile-Automation/eroev-16-06.apk",
      host: "127.0.0.1",
      port: 4723,
      //path: "/", //'/wd/hub',
      path:'/wd/hub',
      protocol: "http",
      desiredCapabilities: {
            platform: 'Android',
            device: 'emulator-5554',  //''Mi A2'
            appPackage:"com.eroev.app",
            chromedriverpath: "/Users/it062305/dev/project/EroEV-Mobile-Automation/chromedriver",
            automationName: 'UIAutomator2',
            smartWait: 80000,
            unicodeKeyboard: true,
            //resetKeyboard: true,
            //noReset: true,
            fullContextList: true,
            newCommandTimeout: 600,
            appActivity: 'com.eroev.app.MainActivity', 
            'appium:debug': true,
            "appium:autoGrantPermissions": true
           
      },
      chromeOptions: {
        w3c: false,
      },
    },
  },
  // plugins: {
  //   allure: {
  //     enabled: true,
  //     outputDir: 'allure-results',
  //     require: '@codeceptjs/allure-legacy'
  //   },
  // },
  include: {
    I: "./steps_file",
  },
  bootstrap: null,
  mocha: {
    reporter: 'mochawesome',  // Ensure you're using mochawesome as the reporter
    reporterOptions: {
      reportDir: './output/reports/history',
      reportFilename: `test-report-${new Date().toISOString().replace(/[:.]/g, '-')}`,
      reportTitle: 'EroEV Test Report', // Custom Title
      reportPageTitle: 'EroEV Automation Test Results', // Custom HTML Page Title
      embeddedScreenshots: true, // Embed screenshots in the report
      inlineAssets: true, // Use inline CSS/JS for portability
      charts: true, // Include charts for analytics
      html: true,
      json: true,
      timestamp: true, // Ensure reports include timestamp
      quiet: false

    }
  },
plugins: {
  
    // allure: {
    //   enabled: true,
    //   outputDir: 'allure-results',
    //   require: '@codeceptjs/allure-legacy',
    //   overwrite: false, // Append new results to existing file
    //   html: true, // Enable HTML report generation
    //   json: true,
    // },

    // allure: {
    //   enabled: true,
    //   outputDir: allureResultsDir,
    //   require: '@codeceptjs/allure-legacy',
    //   quiet: true,
    //   overwrite: false, // Append results to maintain history
    //   html: true,       // Generate HTML reports
    //   json: true,       // Generate JSON results for data analysis
    //   history: true,    // Enable historical trends
    // },
},
  name: "uie2e",
};