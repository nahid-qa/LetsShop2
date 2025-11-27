const { test, expect } = require("@playwright/test");
const { POmanager } = require("../pageobjects/POmanager");
const LoginDataset = JSON.parse(JSON.stringify(require("../TestData/LoginPageObjectTestData.json")))

test('TC_01_Successful_Login', async ({ page }) => {

    //Fetch email and password data from json data file
    const loginCredential = LoginDataset[1];
    const email = await loginCredential.email;
    const password = loginCredential.password;

    // Navigate to login Page.

    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.landingUrl();

    // Verify login page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

    // Fill the login email and password.
    await loginPage.fillLoginEmailandPassword(email, password);

    // Login and validate successful login message.
    const loginSuccessfulMessage = await loginPage.loginandCaptureSuccessfulLoginMessage();
    await expect(loginSuccessfulMessage).toBeVisible();



})

test('TC_02_Login_Wrong_Password', async ({ page }) => {

    //Fetch email and password data from json data file
    const loginCredential = LoginDataset[2];
    const email = await loginCredential.email;
    const password = loginCredential.password;
    const message = loginCredential.message;

    // Navigate to login Page.
    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.landingUrl();

    // Verify login page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

    // Fill the login email and password.
    await loginPage.fillLoginEmailandPassword(email, password);

    // Login and validate Erro pop up message 'ncorrect email or password.'.
    const actualLoginErrorMessage = await loginPage.loginandCaptureErrorMessage();
    expect(actualLoginErrorMessage).toBe(message)


})

test('TC_03_Login_with_Empty_Email', async ({ page }) => {

    //Fetch email and password data from json data file
    const loginCredential = LoginDataset[3];
    const email = await loginCredential.email;
    const password = loginCredential.password;
    const message = loginCredential.message;

    // Navigate to login Page.
    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.landingUrl();

    // Verify login page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

    // Fill the login email and password.
    await loginPage.fillLoginEmailandPassword(email, password);

    // Login and validate Erro pop up message 'incorrect email or password.'.
    const actualLoginErrorMessage = await loginPage.missingEmailErrorMessage();
    expect(actualLoginErrorMessage).toBe(message)


})

test('TC_04_with_Empty_Password', async ({ page }) => {

    //Fetch email and password data from json data file
    const loginCredential = LoginDataset[4];
    const email = loginCredential.email;
    const password = loginCredential.password;
    const message = loginCredential.message;

    // Navigate to login Page.
    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.landingUrl();

    // Verify login page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

    // Give blank login email and password.
    await loginPage.fillLoginEmailandPassword(email, password);

    // Validate Error messages for blanlk email and password feilds 'incorrect email or password.'.
    const actualLoginErrorMessage = await loginPage.missingPasswordErrorMessage();
    expect(actualLoginErrorMessage).toBe(message);


})

test('TC_05_Login_with_Empty_Fields', async ({ page }) => {

    //Fetch email and password data from json data file
    const loginCredential = LoginDataset[5];
    const email = loginCredential.email;
    const password = loginCredential.password;
    const message = loginCredential.message;

    // Navigate to login Page.
    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.landingUrl();

    // Verify login page title is "Let's Shop".
    await expect(page).toHaveTitle("Let's Shop");

    // Fill the login email and password.
    await loginPage.fillLoginEmailandPassword(email, password);

    // Login and validate Erro pop up message 'incorrect email or password.'.
    const actualLoginErrorMessage = await loginPage.getRequiredFieldErrorMessages();
    expect(actualLoginErrorMessage.emailError).toBe("*Email is required");
    expect(actualLoginErrorMessage.passwordError).toBe("*Password is required");


})
