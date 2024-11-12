import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: "src/specs/**/*_test.ts",
  //tests: "src/spec/./*_test.ts",
  logLevel: "info",
  output: "",
  helpers: {
    Appium: {
      appiumV2: true,
      platform: "iOS",
      device: "iPhone 12 mini",
      app: "/Users/it062305/dev/project/EroEV-Mobile-Automation/Payload/EROEV.app",
      host: "127.0.0.1",
      port: 4723,
      path: "/", //'/wd/hub',
      protocol: "http",
      desiredCapabilities: {
        platformName: "iOS",
        "appium:clearSystemFiles": true,
        "appium:appPackage": "com.eroev.app",
        "appium:platformVersion": "18.1", // Ensure this matches your simulator or device version
        "appium:deviceName": "iPhone 12 mini",
        "appium:automationName": "XCUITest",
        "appium:useNewWDA": true, // Ensures a new WebDriverAgent session
        "appium:wdaLaunchTimeout": 80000,
        "appium:app":
          "/Users/it062305/dev/project/EroEV-Mobile-Automation/Payload/EROEV.app", //"/Users/it062305/dev/project/EroEV-Mobile-Automation/Payload/EROEV.app", // Path to .ipa for real device
        "appium:udid": "00008101-001A24A01EE9003A", //FEBB7FEC-9584-4ABF-93BD-A162A2230105
        "appium:serialNumber": "C7CDX53D0GPX", // Ensure this matches the correct UDID
        "appium:bundleId": "com.eroev.app",
      },
      // chromeOptions: {
      //   w3c: false,
      // },
    },
  },
  include: {
    I: "./steps_file",
  },
  name: "uie2e",
};