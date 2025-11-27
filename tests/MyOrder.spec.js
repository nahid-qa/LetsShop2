// Import necessary modules from Playwright
const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require('../Utils/ApiUtils');
const { POmanager } = require("../pageobjects/POmanager");
const testData = JSON.parse(JSON.stringify(require("../TestData/LoginPageObjectTestData.json")))


//Fetch test data from json data file
const Dataset = testData[0];
const email = Dataset.email;
const password = Dataset.password;
const productName = Dataset.productName;
const creditCard = Dataset.creditCard;
const country = Dataset.country;

// Create data for login and order payload.

const loginPayload = { userEmail: email, userPassword: password };
const orderPayload = { orders: [{ country: country, productOrderedId: "68a961719320a140fe1ca57c" }] };
let response;


// This will run before all testcases.
test.beforeAll(async () => {

    // Set up the API request context.
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);

    // Create an order 
    response = await apiUtils.createOrder(orderPayload);


})

test("TC_01_Verify_Ordered_Product_Details", async ({ page }) => {

    //Set loken value in local storage.
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const poManager = new POmanager(page);
    const myOrdersPage = poManager.getMyordersPage();

    //Click Order button to navigate to the orders page.
    await page.goto("https://rahulshettyacademy.com/client/");
    await myOrdersPage.myOrderLandingPage();
    await page.pause();

    // Search orderid in the my orders page and click view button and validate order details.
    const orderdetailsPage = await myOrdersPage.searchOrder(response.orderId);

    // Validate orderid, billing email, billing country, delivery email, delivery country and product name in order details.

    //Validates orderid.
    const orderId = await orderdetailsPage.getOrderID();
    expect(orderId).toBe(response.orderId);

    //Validates Billing Email is same which is used in the login.
    const BillingEmail = await orderdetailsPage.getBillingEmail();
    expect(BillingEmail).toBe(email);


    //Validates Product Name is same which is ordered.

    const oderedProductName = await orderdetailsPage.getProductName();
    expect(oderedProductName).toBe(productName);




})