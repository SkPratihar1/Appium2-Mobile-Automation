const { I } = inject();


export = {
  locator: {
    inputField: {
      //emailField: "Email",
      //passwordFiled: "//android.widget.EditText[@text='Password']",
      emailInput: "//*[@resource-id='Email']",
      passwordInput: "//*[@resource-id='Password']",
      
      
    },
    // iosInputField:{
    //   emailField: '(//XCUIElementTypeOther[@name="Email"])[2]/XCUIElementTypeTextField',
    //   passwordFiled: '(//XCUIElementTypeOther[@name="Password"])[2]/XCUIElementTypeSecureTextField',
    // },
    // iosButton:{
    //   signIn:'(//XCUIElementTypeOther[@name="Sign In"])[2]',
    //   notificationAllow:'//XCUIElementTypeButton[@name="Allow"]',
    //   passwordSaveNoteNow:'//XCUIElementTypeButton[@name="Not Now"]'

    // },

    button: {
      signIn: "Sign In",
      showPassword: "Show Password",
      hidePassword: "Hide Password",
    },
  },

  inputField(selector: any, userSignData: any) {
    I.click(selector);
    I.appendField(selector, userSignData);
  },
  
  async signIn(email: any, password: any) {
   
      // I.waitForElement({android:this.locator.inputField.emailInput,ios:this.locator.iosInputField.emailInput});
      // this.inputField({android:this.locator.inputField.emailField,ios:this.locator.iosInputField.emailField}, email);
      // this.inputField({android:this.locator.inputField.passwordInput,ios:this.locator.iosInputField.passwordInput}, password);
      // I.waitForElement({android:this.locator.button.signIn,ios:this.locator.iosButton.signIn});
      // I.tap({android:this.locator.button.signIn,ios:this.locator.iosButton.signIn});

      //I.waitForElement(this.locator.inputField.emailInput);
      // this.inputField(this.locator.inputField.emailInput, email);
      
       I.appendField({android:'//*[@resource-id="Email"]',ios:'//XCUIElementTypeTextField[@name="Email"]'},email)
       I.appendField({android:'//*[@resource-id="Password"]',ios:'//XCUIElementTypeSecureTextField[@name="Password"]'},password)
       I.click({android:'android=new UiSelector().text("Sign In")',ios:'//XCUIElementTypeOther[@name="Sign In"]'})
       I.see('Scan QR')

  },
};
