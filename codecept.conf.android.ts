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
      platform: "Android",
      device: "Pixel_6_Pro_API_34",
      app: "/Users/it062305/dev/project/EroEV-Mobile-Automation/app-releaseStg9.apk",
      host: "127.0.0.1",
      port: 4723,
      path: "/", //'/wd/hub',
      protocol: "http",
      desiredCapabilities: {
            platform: 'Android',
            device: 'Pixel_6_Pro_API_34',
            appPackage:"com.eroev.app",
            //chromedriverpath: "/Users/it062305/dev/project/EroEV-Mobile-Automation/chromedriver",
            automationName: 'UIAutomator2',
            smartWait: 80000,
            unicodeKeyboard: true,
            resetKeyboard: true,
    
         
      },
    //   chromeOptions: {
    //     w3c: false,
    //   },
    },
  },
  include: {
    I: "./steps_file",
  },
  name: "uie2e",
};