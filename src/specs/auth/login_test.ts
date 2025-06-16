import SignInPage from '../../lib/pages/logInLogOut/login'
// import { AppiumDriver } from 'appium';
// import { remote } from 'webdriverio';

Feature('login scenario')
Scenario('EroEv Sign ', async ({I }) => {
   
    I.wait(4);
    SignInPage.signIn('pratihar+ev@itobuz.com','Itobuz$1234')
    
    //Android
    // I.wait(4)
    // I.appendField('//*[@resource-id="Email"]','pratihar+ev@itobuz.com')
    // I.appendField('//*[@resource-id="Password"]','Itobuz$1234')
  
    // I.wait(4)
    // I.click('android=new UiSelector().text("Sign In")');
    // //await I.tap('android=new UiSelector().text("Sign In")');;
    // I.wait(9);
    // //I.waitForVisible('(//XCUIElementTypeOther[@name="Scan QR"])[7]')
    // I.see('Scan QR')
    



    //iOS
    // I.wait(4)
    // I.appendField('//XCUIElementTypeTextField[@name="Email"]','rishikesh@itobuz.com')
    // I.appendField('//XCUIElementTypeSecureTextField[@name="Password"]','111')
    // const signInButton = await I.grabTextFrom('//XCUIElementTypeOther[@name="Sign In"]');
    // console.log(signInButton)
    // await I.click('//XCUIElementTypeOther[@name="Sign In"]');
    // I.wait(9)
    
  
    // I.waitForVisible('(//XCUIElementTypeOther[@name="Scan QR"])[7]')
    // I.see('Scan QR')
    
});

// Scenario('Pretaa Sign-Out', ({I}) => {
//     signOut.logout();
// });