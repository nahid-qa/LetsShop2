const { test, expect } = require("@playwright/test");
const { POmanager } = require("../pageobjects/POmanager");


test('TC_01_Check_Account_Registeration_Page_Title ', async ({ page }) => {
    const poManager = new POmanager(page);
    const registrationPage = poManager.getRegistrationPage();

    // Navigate to registration page.
    await registrationPage.getRegistrationLandingPage();

    // Verify registration page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

}
);

test('TC_02_Click_Login_Button_with_Empty_Fields', async ({ page }) => {
    const poManager = new POmanager(page);
    const registrationPage = poManager.getRegistrationPage();

    // Navigate to registration page.
    await registrationPage.getRegistrationLandingPage();

    // Click login button.
    await registrationPage.registerButton();

    //Verify all the error messages for required fields.
    expect((await registrationPage.getRequiredFieldErrorMessages()).firstNameError).toBe("*First Name is required");
    expect((await registrationPage.getRequiredFieldErrorMessages()).emailError).toBe("*Email is required");
    expect((await registrationPage.getRequiredFieldErrorMessages()).phoneNumberError).toBe("*Phone Number is required");
    expect((await registrationPage.getRequiredFieldErrorMessages()).passwordError).toBe("*Password is required");
    expect((await registrationPage.getRequiredFieldErrorMessages()).confirmPasswordError).toBe("*Confirm Password is required");
    expect((await registrationPage.getRequiredFieldErrorMessages()).ageConsentError).toBe("*Please check above checkbox");

}
);

test('TC_03_Successful_Registration_with_all_the_fields', async ({ page }) => {

    const poManager = new POmanager(page)
    const registrationPage = poManager.getRegistrationPage();
    const loginPage = poManager.getLoginPage();
    const lastName = "Testing";
    const Name = "TestUser"
    const userData = registrationPage.getUserData(Name, lastName);
    const firstName = userData.userName;
    const email = userData.email;
    const password = 'Testing@123';
    const occupation = '2: Student';
    const gender = "Female";
    const userMobile = registrationPage.getValidPhoneNumber();
    const expectedSuccessMessage = 'Account Created Successfully'

    // Navigate to Registration Page.
    await registrationPage.getRegistrationLandingPage();

    // Verify registration page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

    // Fill the registration details.
    await registrationPage.fillNewUserRegistration(firstName, lastName, email, userMobile, password);

    // Fill occupation field.
    const selectedValue = await registrationPage.getoccupationDropdowValue(occupation);

    // Verify occupation field has selected value
    expect(selectedValue).toEqual('2: Student');

    // Select gender radio button
    const boolGenderRadioButton = await registrationPage.genderRadioButton(gender);

    // Verify gender field has selected value
    await expect(boolGenderRadioButton).toBeTruthy();

    // Check age consent checkbox
    const boolageConsentCheckbox = await registrationPage.ageConsentCheckbox();

    // Verify age consent checkbox is checked.
    expect(boolageConsentCheckbox).toBeTruthy();

    //Click login Button
    await registrationPage.registerButton();

    // Verify successfull login Message
    const actualSuccessMessage = await registrationPage.afterRegistrationMessage();
    expect(actualSuccessMessage).toBe(expectedSuccessMessage);

    // //Click login button from registration page to navigate to login page.

    await registrationPage.clickRegistrationPageLoginButtontoLogin();

    //Fill newly created user's email and password

    await loginPage.fillLoginEmailandPassword(email, password);

    // Login to newly created account and verify login successful message.
    const loginSuccessfulMessage = await loginPage.loginandCaptureSuccessfulLoginMessage();
    await expect(loginSuccessfulMessage).toBeVisible();


}
);

test('TC_04_Successful_Registration_with_Only_Required_Fields', async ({ page }) => {

    const poManager = new POmanager(page)
    const registrationPage = poManager.getRegistrationPage();
    const loginPage = poManager.getLoginPage();
    const Name = "TestUser";
    const lastName = "Testing";
    const userData = registrationPage.getUserData(Name, lastName);
    const firstName = userData.userName;
    const email = userData.email;
    const password = 'Testing@123';
    const userMobile = registrationPage.getValidPhoneNumber();
    const expectedSuccessMessage = 'Account Created Successfully'

    // Navigate to Registration Page.
    await registrationPage.getRegistrationLandingPage();

    // Verify registration page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

    // Fill the registration details.
    await registrationPage.fillNewUserRegistration(firstName, lastName, email, userMobile, password);

    // Check age consent checkbox
    const boolageConsentCheckbox = await registrationPage.ageConsentCheckbox();

    // Verify age consent checkbox is checked.
    expect(boolageConsentCheckbox).toBeTruthy();

    //Click Register Button
    await registrationPage.registerButton();

    // Verify successfull Registration Message
    const actualSuccessMessage = await registrationPage.afterRegistrationMessage();
    expect(actualSuccessMessage).toBe(expectedSuccessMessage);

    //Click login button from registration page to navigate to login page.

    await registrationPage.clickRegistrationPageLoginButtontoLogin();

    //Fill newly created user's email and password
    await loginPage.fillLoginEmailandPassword(email, password);

    // Login to newly created account and verify login successful message.
    const loginSuccessfulMessage = await loginPage.loginandCaptureSuccessfulLoginMessage();
    await expect(loginSuccessfulMessage).toBeVisible();


}
);

test('TC_05_Register_with_Already_Registered_Email', async ({ page }) => {

    const poManager = new POmanager(page)
    const registrationPage = poManager.getRegistrationPage();
    const loginPage = poManager.getLoginPage();
    const Name = "TestUser";
    const lastName = "Testing";
    const userData = registrationPage.getUserData(Name, lastName);
    const firstName = userData.userName;
    const email = 'test.nlt@getMaxListeners.com';
    const password = 'Testing@123';
    const userMobile = registrationPage.getValidPhoneNumber();
    const expectedErrorMessage = ' User already exisits with this Email Id! '

    // Navigate to Registration Page.
    await registrationPage.getRegistrationLandingPage();

    // Verify registration page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

    // Fill the registration details.
    await registrationPage.fillNewUserRegistration(firstName, lastName, email, userMobile, password);

    // Check age consent checkbox
    const boolageConsentCheckbox = await registrationPage.ageConsentCheckbox();

    // Verify age consent checkbox is checked.
    expect(boolageConsentCheckbox).toBeTruthy();

    //Click Register Button
    await registrationPage.registerButton();

    // Verify Registration Message error for already registered user.
    const actualExistingUserMessage = await registrationPage.duplicateEmailRegistrationMessage();
    expect(actualExistingUserMessage).toBe(expectedErrorMessage);

}
);






