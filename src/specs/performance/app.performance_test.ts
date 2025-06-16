
import { expect } from 'chai';
import SignInPage from '../../lib/pages/logInLogOut/login'
Feature('Performance Testing');

Scenario('Measure App Load Time', async ({ I }) => {
  const startTime = Date.now();
  //I.appWaitForElement()
//   I.executeScript(() => {
    
//     // Appium's native launchApp method
//     I.launchApp();
//   });
  I.waitForVisible('You must sign in to charge') 
  const endTime = Date.now();
  const loadTime = (endTime - startTime) / 1000; // Time in seconds
  console.log(`App Load Time: ${loadTime} seconds`);

  // Assert that the load time is within an acceptable range (e.g., less than 10 seconds)
  expect(loadTime).to.be.lessThan(10, 'App load time is too long')
});

Scenario('Measure Login Performance', async ({ I }) => {
  const startTime = Date.now();
  I.waitForVisible('You must sign in to charge')
  SignInPage.signIn('pratihar+ev@itobuz.com','Itobuz$1234')
  
  //I.waitForElement('Welcome Screen', 10); // Wait for successful login screen
  const endTime = Date.now();
  const loginTime = (endTime - startTime) / 1000; // Time in seconds
  console.log(`Login Time: ${loginTime} seconds`);
  expect(loginTime).to.be.lessThan(5, 'App load time is too long')
  //I.assert(loginTime < 5, 'Login time is too long');
});

// Scenario('Measure Functional Performance (Form Submission)', async ({ I }) => {
//   const startTime = Date.now();
//   I.fillField('inputField', 'Test Data'); // Replace with actual input fields
//   I.tap('Submit');
//   I.waitForText('Success', 10); // Replace with actual success message
//   const endTime = Date.now();
//   const formSubmitTime = (endTime - startTime) / 1000; // Time in seconds
//   console.log(`Form Submission Time: ${formSubmitTime} seconds`);
//   I.assert(formSubmitTime < 3, 'Form submission took too long');
// });
