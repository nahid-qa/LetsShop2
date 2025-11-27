# 🛒 Let'sShop-Playwright-Automation

Automated UI + API end-to-end test suite for the demo eCommerce application **“Let’s Shop”** (rahulshettyacademy.com).  
This project uses **Playwright (JavaScript)** and covers essential user journeys such as login, user registration, order placement, and order verification.  
Some flows use **Playwright’s API Testing capability** for faster + reliable scenarios.

---

## 🚀 Project Overview

This repository contains a hybrid **UI + API automation framework** developed using Playwright Test.  
The suite is designed for interview demonstrations and real-world QA practice.

Key highlights:

- Page Object Model (POM)  
- API + UI combined workflows  
- Trace, video, and screenshot capturing  
- Reusable fixtures & utilities  
- Clean and scalable folder structure

---

## ✔️ Features Covered

### **1️⃣ Login Tests (UI + API)**  
**UI Tests**  
- Valid login  
- Invalid login  
- Error message validation  

**API Tests**  
- Generate login token using API (faster & reliable)  
- Reuse token for authenticated flows  

---

### **2️⃣ New User Registration (UI)**
- Create new user  
- Validate success message  

---

### **3️⃣ Order Creation (API + UI Hybrid)**  
This flow uses API for **authentication** (token generation) and UI for cart/checkout interactions.

- Login via API  
- Add product via UI  
- Proceed to cart & checkout  
- Place order  
- Validate order success message  

Benefits:  
✔ Faster  
✔ Avoids repeated login UI steps  
✔ More stable

---

### **4️⃣ Order Verification (API-driven)**
- Login using API token  
- Create order through API  
- Validate response: product name, order ID  
- Cross-verify order details in UI “My Orders” page

---

## 🧰 Tech Stack

| Component | Description |
|----------|-------------|
| **Language** | JavaScript |
| **UI Automation** | Playwright |
| **API Testing** | Playwright APIRequestContext |
| **Test Runner** | Playwright Test |
| **Architecture** | POM (Page Object Model) |
| **Reports** | HTML Report, Trace Viewer, Screenshots |
| **Assertion Library** | Built-in Playwright expect() |

---

## 📁 Project Structure

Let'sShop-Playwright-Automation/ │ ├── tests/ │ ├── Login.spec.js │ ├── NewUserRegistration.spec.js │ ├── CreateOrder.spec.js │ ├── MyOrder.spec.js │├── pageobjects/ │ ├── DashboardPage.js │ ├── LoginPage.js │ ├── RegistrationPage.js │ ├── OrderdetailsPage.js │ ├── CheckoutPage.js │ └── OrderPage.js │ ├── ThanksPage.js │ ├── MyOrdersPage.js │ ├── POmanage.js│ ├── Utils/ │ ├── ApiUtils.js # API login + order API helpers │ ├── TestData/ │ ├── LoginPageObjectTestData.json │ ├── playwright.config.js ├── package.json ├── .gitignore └── README.md

---

## 🔌 API Usage in This Project

This project uses **Playwright's APIRequestContext**:

### ✔ **1. API Login (Token Generation)**
Used to skip UI login steps in order creation and order verification flows.

```javascript
const apiContext = await request.newContext();
const response = await apiContext.post('/api/ecom/auth/login', {
  data: { userEmail, userPassword }
});
const { token } = await response.json();

✔ 2. API Create Order (Order Creation)

await apiContext.post('/api/ecom/order/create-order', {
  data: orderPayload,
  headers: { Authorization: token }
});

Using API makes tests:

Faster

Less flaky

More realistic

---

🛠️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/<your-username>/Let'sShop-Playwright-Automation.git
cd Let'sShop-Playwright-Automation

2️⃣ Install dependencies

npm install

3️⃣ Install Playwright browsers

npx playwright install


---

▶️ Running UI + API Tests

Run all tests

npx playwright test

Run specific file

npx playwright test tests/orderVerification.spec.js

Run headed mode

npx playwright test --headed

Playwright UI mode

npx playwright test --ui


---

📊 Reports & Debugging

View HTML report

npx playwright show-report

View trace

npx playwright show-trace trace.zip


---

🎯 What This Project Demonstrates (For Recruiters)

Strong understanding of UI + API testing combined

Playwright POM architecture

Authentication via API token

End-to-end ordering workflow

Clean code, reusable page objects

Git, GitHub, and test documentation

Good interview-friendly structure

Stable, maintainable Playwright test framework



---

📌 Future Enhancements

GitHub Actions CI pipeline

Add visual regression tests

Add API contract validation using JSON schemas

Add data-driven testing using JSON/Excel



---

🤝 Contributions

This is an interview practice project — contributions and suggestions are welcome.


---

📧 Contact

Created by Nahid
Playwright + API + UI Automation | QA Engineer

---

