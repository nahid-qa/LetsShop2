// Import necessary modules from Playwright
const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require('../Utils/ApiUtils');
const { POmanager } = require("../pageobjects/POmanager");
const testData = JSON.parse(JSON.stringify(require("../TestData/LoginPageObjectTestData.json")));

//Fetch test data from json data file
const Dataset = testData[0];
const email = Dataset.email;
const password = Dataset.password;
const productName = Dataset.productName;
const creditCard = Dataset.creditCard;
const country = Dataset.country;

// Create data for login and order payload.

const loginPayload = { userEmail: email, userPassword: password };
let response;


// This will run before all testcases.
test.beforeAll(async () => {

    // Set up the API request context.
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);

    // Create an order 
    response = await apiUtils.getToken();


})

test("TC_01_SUCCESS_PlaceOrderWithSingleProduct", async ({ page }) => {

    //Set loken value in local storage.
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response);


    //Navigate to login page
    await page.goto("https://rahulshettyacademy.com/client/");

    //Click button 'Add to Cart' to purchase a product and verify success message.
    const poManager = new POmanager(page)
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.SearchAndAddProductToCart(productName);

    // Click 'Cart' button to navigate to cart page.
    await dashboardPage.AddToCart();
    const cartPage = poManager.getCartPage();

    // Click 'Checkout' button
    await cartPage.CheckOutButton(productName);
    const orderPage = poManager.getOrderPage();

    // Fill CreditCard Information
    await orderPage.FillCCInfo(creditCard);

    //Fill Shipping information
    await orderPage.ShippingInfo(email, country)

    //Click 'PLACE ORDER' button.
    await orderPage.PlaceOrder();

    //Verify Order is placed successfully. "Thankyou for the order " text is displayed.
    const thanksPage = poManager.getThanksPage();
    expect(await thanksPage.getThankyouTxt()).toBe(" Thankyou for the order. ")

    // Verify productname in the order page.
    expect(await thanksPage.getProductName()).toBe(productName);

    // Get oder id from thankyou page
    const orderId = await thanksPage.GetOrderID();

    // Go to my order history page
    const myordersPage = poManager.getMyordersPage();
    await myordersPage.myOrderLandingPage();

    // Search and verify Orderid is present in the order history page.
    const orderdetailsPage = await myordersPage.searchOrder(orderId);
    const orderDetailID = await orderdetailsPage.getOrderID();
    expect(orderDetailID).not.toBeFalsy();

})