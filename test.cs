using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace MilkUI.Tests
{
    [TestFixture]
    public class UserRegistrationTests
    {
        private IWebDriver driver;
        private const string BaseUrl = "http://localhost:3000"; // Update with your actual base URL

        [SetUp]
        public void Setup()
        {
            // Setup Chrome driver
            ChromeOptions options = new ChromeOptions();
            options.AddArgument("--start-maximized");
            driver = new ChromeDriver(options);
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        }

        [Test]
        public void U_01_UserRegistration_Success()
        {
            // Test Case Information
            // ID: U-01
            // Description: User Registration
            // Expected Result: Successfully register, auto-login and redirect to login page
            // Test Data: "email: test@gmail.com pass: Aa123456789!"

            try
            {
                // 1. Open browser and click "Login" button
                driver.Navigate().GoToUrl(BaseUrl);
                var loginButton = driver.FindElement(By.Id("login-button"));
                loginButton.Click();

                // 2. Click registration button
                // Note: The exact ID/selector needs to be updated based on your actual implementation
                var registerLink = driver.FindElement(By.XPath("//button[contains(text(),'Sign Up')]"));
                registerLink.Click();

                // 3. Enter email
                var emailField = driver.FindElement(By.Name("email"));
                emailField.SendKeys("test@gmail.com");

                // 4. Enter password
                var passwordField = driver.FindElement(By.Name("password"));
                passwordField.SendKeys("Aa123456789!");

                // 5. Click "Register" button
                var registerButton = driver.FindElement(By.XPath("//button[@type='submit']"));
                registerButton.Click();

                // 6. If registration prompt appears, click Accept
                try
                {
                    var acceptButton = driver.FindElement(By.XPath("//button[contains(text(),'Accept')]"));
                    acceptButton.Click();
                }
                catch (NoSuchElementException)
                {
                    // Accept button might not appear if not necessary
                    Console.WriteLine("Accept button not found or not necessary");
                }

                // 7. Verify successful registration and auto-login
                // Wait for redirection to home page
                Thread.Sleep(2000); // Better to use explicit wait in real tests

                // Verify user is logged in - check for avatar which indicates successful login
                var avatar = driver.FindElement(By.Id("avatar"));

                // Assert that user is logged in and redirected properly
                Assert.IsTrue(avatar.Displayed, "User avatar is displayed, indicating successful login");
                Assert.IsTrue(driver.Url.Contains(BaseUrl), "User is redirected to the home page after login");

                // Test passed
                Console.WriteLine("Test U-01: PASSED - User registration successful");
            }
            catch (Exception e)
            {
                // Test failed
                Console.WriteLine($"Test U-01: FAILED - {e.Message}");
                throw;
            }
        }

        [Test]
        public void U_09_UpdateProductQuantity_Success()
        {
            // Test Case Information
            // ID: U-09
            // Description: Update product quantity in cart
            // Expected Result: Total price updates correctly
            // Test Data: "email: test@gmail.com pass: Aa123456789!"

            try
            {
                // 1. Open browser
                driver.Navigate().GoToUrl(BaseUrl);

                // 2. Click on menu icon to view product list
                var menuButton = driver.FindElement(By.Id("Menu"));
                menuButton.Click();

                // 3. Click on Milk icon
                var milkCategory = driver.FindElement(By.Id("1"));
                milkCategory.Click();

                // 4. Display list of products
                var productList = driver.FindElements(By.CssSelector("[class*='Milk_wrapper']"));
                Assert.IsTrue(productList.Count > 0, "Product list should be displayed");

                // 5. Select a product
                var product = driver.FindElement(By.CssSelector("[class*='ProductItem_wrapper']"));
                product.Click();

                // 6. Product information is displayed
                // Wait for product details to load
                Thread.Sleep(1000);

                // Get initial price
                var productPrice = driver.FindElement(By.CssSelector("[class*='Price_price']")).Text;
                var initialPrice = ExtractPrice(productPrice);

                // 7. Click button to increase product quantity
                var increaseButton = driver.FindElement(By.Id("add-quantity-product"));
                increaseButton.Click();

                // 8. Click button to add to cart
                var addToCartButton = driver.FindElement(By.Id("add-cart"));
                addToCartButton.Click();

                // Wait for cart update
                Thread.Sleep(1000);

                // 9. Quantity increases
                // 10. Price updates correctly
                var updatedPrice = driver.FindElement(By.CssSelector("[class*='Price_price']")).Text;
                var newPrice = ExtractPrice(updatedPrice);

                // Assert that the new price is double the initial price (since we increased quantity by 1)
                Assert.AreEqual(initialPrice * 2, newPrice, "Total price should update correctly after increasing quantity");

                Console.WriteLine("Test U-09: PASSED - Product quantity updated successfully and price calculated correctly");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-09: FAILED - {e.Message}");
                throw;
            }
        }
        [Test]
        public void U_10_PaymentWithCreditCard_Success()
        {
            // Test Case Information
            // ID: U-10
            // Description: Payment with credit card
            // Expected Result: Display "Payment successful" message
            // Test Data: "email: test@gmail.com pass: Aa123456789! emailPaypal: sb-ndf47127914447@business.example.com password: yDR.xvw2"

            try
            {
                // 1. Open browser
                driver.Navigate().GoToUrl(BaseUrl);

                // 2. Click on menu icon to view product list
                var menuButton = driver.FindElement(By.Id("Menu"));
                menuButton.Click();

                // 3. Click on Milk icon
                var milkCategory = driver.FindElement(By.Id("1"));
                milkCategory.Click();

                // 4. Display list of products
                var productList = driver.FindElements(By.CssSelector("[class*='Milk_wrapper']"));
                Assert.IsTrue(productList.Count > 0, "Product list should be displayed");

                // 5. Select a product
                var product = driver.FindElement(By.CssSelector("[class*='ProductItem_wrapper']"));
                product.Click();

                // 6. Product information is displayed
                Thread.Sleep(1000);

                // 7. Click button to add to cart
                var addToCartButton = driver.FindElement(By.Id("add-cart"));
                addToCartButton.Click();

                // 8. Click cart button to view cart
                var cartButton = driver.FindElement(By.Id("btn-cart"));
                cartButton.Click();

                // 9. Click buy button
                var buyButton = driver.FindElement(By.Id("buy-order"));
                buyButton.Click();

                // 10. Click continue button
                var continueButton = driver.FindElement(By.Id("continue"));
                continueButton.Click();

                // 11. Choose credit card tab
                var creditCardTab = driver.FindElement(By.Id("1"));
                creditCardTab.Click();

                // 12. Click PayPal button
                var paypalButton = driver.FindElement(By.CssSelector(".paypal-button.paypal-button-number-0"));
                paypalButton.Click();

                // Wait for PayPal login window
                Thread.Sleep(3000);

                // Switch to PayPal popup window
                string mainWindow = driver.CurrentWindowHandle;
                foreach (string handle in driver.WindowHandles)
                {
                    if (handle != mainWindow)
                    {
                        driver.SwitchTo().Window(handle);
                        break;
                    }
                }

                // 13-14. Enter PayPal email
                var emailField = driver.FindElement(By.Name("email"));
                emailField.SendKeys("sb-ndf47127914447@business.example.com");

                // 15. Enter PayPal password
                var passwordField = driver.FindElement(By.Name("password"));
                passwordField.SendKeys("yDR.xvw2");

                // 16. Click login button
                var loginButton = driver.FindElement(By.Id("btnLogin"));
                loginButton.Click();

                // Wait for payment processing
                Thread.Sleep(3000);

                // 17. Click payment submit button
                var paymentSubmitButton = driver.FindElement(By.Id("payment-submit-btn"));
                paymentSubmitButton.Click();

                // Switch back to main window
                driver.SwitchTo().Window(mainWindow);

                // Wait for confirmation page
                Thread.Sleep(3000);

                // Verify successful payment message
                var successMessage = driver.FindElement(By.CssSelector("[class*='OrderDone_title']"));
                Assert.IsTrue(successMessage.Text.Contains("Thanh toán thành công") ||
                             successMessage.Text.Contains("Payment successful"),
                             "Payment success message should be displayed");

                Console.WriteLine("Test U-10: PASSED - Payment with credit card successful");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-10: FAILED - {e.Message}");
                throw;
            }
        }
        [Test]
        public void U_11_PaymentWithCreditCard_Failure()
        {
            // Test Case Information
            // ID: U-11
            // Description: Payment with incorrect bank card information
            // Expected Result: Display "Some of your info isn't correct. Please try again." message
            // Test Data: "email: test@gmail.com pass: Aa123456789! emailPaypal: sb-ndf47127914447@business.example.com password: yDR.xvw21"

            try
            {
                // 1. Open browser
                driver.Navigate().GoToUrl(BaseUrl);

                // 2. Click on menu icon to view product list
                var menuButton = driver.FindElement(By.Id("Menu"));
                menuButton.Click();

                // 3. Click on Milk icon
                var milkCategory = driver.FindElement(By.Id("1"));
                milkCategory.Click();

                // 4. Display list of products
                var productList = driver.FindElements(By.CssSelector("[class*='Milk_wrapper']"));
                Assert.IsTrue(productList.Count > 0, "Product list should be displayed");

                // 5. Select a product
                var product = driver.FindElement(By.CssSelector("[class*='ProductItem_wrapper']"));
                product.Click();

                // 6. Product information is displayed
                Thread.Sleep(1000);

                // 7. Click button to add to cart
                var addToCartButton = driver.FindElement(By.Id("add-cart"));
                addToCartButton.Click();

                // 8. Click cart button to view cart
                var cartButton = driver.FindElement(By.Id("btn-cart"));
                cartButton.Click();

                // 9. Click buy button
                var buyButton = driver.FindElement(By.Id("buy-order"));
                buyButton.Click();

                // 10. Click continue button
                var continueButton = driver.FindElement(By.Id("continue"));
                continueButton.Click();

                // 11. Choose credit card tab
                var creditCardTab = driver.FindElement(By.Id("1"));
                creditCardTab.Click();

                // 12. Click PayPal button
                var paypalButton = driver.FindElement(By.CssSelector(".paypal-button.paypal-button-number-0"));
                paypalButton.Click();

                // Wait for PayPal login window
                Thread.Sleep(3000);

                // Switch to PayPal popup window
                string mainWindow = driver.CurrentWindowHandle;
                foreach (string handle in driver.WindowHandles)
                {
                    if (handle != mainWindow)
                    {
                        driver.SwitchTo().Window(handle);
                        break;
                    }
                }

                // 13-14. Enter PayPal email
                var emailField = driver.FindElement(By.Name("email"));
                emailField.SendKeys("sb-ndf47127914447@business.example.com");

                // 15. Enter PayPal password
                var passwordField = driver.FindElement(By.Name("password"));
                passwordField.SendKeys("yDR.xvw21"); // Incorrect password

                // 16. Click login button
                var loginButton = driver.FindElement(By.Id("btnLogin"));
                loginButton.Click();

                // Wait for error message
                Thread.Sleep(3000);

                // 17. Verify error message
                var errorMessage = driver.FindElement(By.CssSelector(".error-message"));
                Assert.IsTrue(errorMessage.Text.Contains("Some of your info isn't correct. Please try again."),
                             "Error message should be displayed");

                Console.WriteLine("Test U-11: PASSED - Payment with incorrect bank card information failed as expected");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-11: FAILED - {e.Message}");
                throw;
            }
        }
        [Test]
        public void U_12_PlaceOrderCOD_Success()
        {
            // Test Case Information
            // ID: U-12
            // Description: Place order with Cash on Delivery
            // Expected Result: Order confirmation displayed successfully
            // Test Data: "email: test@gmail.com pass: Aa123456789!"

            try
            {
                // 1. Open browser
                driver.Navigate().GoToUrl(BaseUrl);

                // 2. Click on menu icon to view product list
                var menuButton = driver.FindElement(By.Id("Menu"));
                menuButton.Click();

                // 3. Click on Milk icon
                var milkCategory = driver.FindElement(By.Id("1"));
                milkCategory.Click();

                // 4. Display list of products
                var productList = driver.FindElements(By.CssSelector("[class*='Milk_wrapper']"));
                Assert.IsTrue(productList.Count > 0, "Product list should be displayed");

                // 5. Select a product
                var product = driver.FindElement(By.CssSelector("[class*='ProductItem_wrapper']"));
                product.Click();

                // 6. Product information is displayed
                Thread.Sleep(1000);

                // 7. Click button to add to cart
                var addToCartButton = driver.FindElement(By.Id("add-cart"));
                addToCartButton.Click();

                // 8. Click cart button to view cart
                var cartButton = driver.FindElement(By.Id("btn-cart"));
                cartButton.Click();

                // 9. Click buy button
                var buyButton = driver.FindElement(By.Id("buy-order"));
                buyButton.Click();

                // 10. Click continue button
                var continueButton = driver.FindElement(By.Id("continue"));
                continueButton.Click();

                // 11. Choose Cash on Delivery tab
                var codTab = driver.FindElement(By.Id("2"));
                codTab.Click();

                // 12. Click confirm payment button
                var confirmPaymentButton = driver.FindElement(By.Id("confirm-payment"));
                confirmPaymentButton.Click();

                // 13. Verify order success message
                Thread.Sleep(2000);
                var orderSuccessMessage = driver.FindElement(By.CssSelector("[class*='OrderDone_title']"));
                Assert.IsTrue(orderSuccessMessage.Text.Contains("Đặt hàng thành công") ||
                             orderSuccessMessage.Text.Contains("Order successful"),
                             "Order success message should be displayed");

                Console.WriteLine("Test U-12: PASSED - COD order placed successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-12: FAILED - {e.Message}");
                throw;
            }
        }
        [Test]
        public void U_13_TrackOrders_Success()
        {
            // Test Case Information
            // ID: U-13
            // Description: Track orders
            // Expected Result: Display list of user's orders
            // Test Data: "email: test@gmail.com pass: Aa123456789!"

            try
            {
                // 1. Open browser and login
                driver.Navigate().GoToUrl(BaseUrl);

                // Login first
                var loginButton = driver.FindElement(By.Id("login-button"));
                loginButton.Click();

                var emailField = driver.FindElement(By.Name("email"));
                emailField.SendKeys("test@gmail.com");

                var passwordField = driver.FindElement(By.Name("password"));
                passwordField.SendKeys("Aa123456789!");

                var signInButton = driver.FindElement(By.XPath("//button[@type='submit']"));
                signInButton.Click();

                Thread.Sleep(2000);

                // 2. Click history icon to view order status
                var historyIcon = driver.FindElement(By.Id("History"));
                historyIcon.Click();

                // 3. Click "All" tab to see all orders
                var allOrdersTab = driver.FindElement(By.Id("1"));
                allOrdersTab.Click();

                // Verify all orders are displayed
                var ordersList = driver.FindElements(By.CssSelector("[class*='TableInfoProduct_wrapper']"));
                Assert.IsTrue(ordersList.Count > 0, "List of orders should be displayed");

                // 4. Click "Pending Confirmation" tab
                var pendingConfirmationTab = driver.FindElement(By.Id("2"));
                pendingConfirmationTab.Click();

                // 5. Click "Confirmed" tab
                var confirmedTab = driver.FindElement(By.Id("3"));
                confirmedTab.Click();

                // 6. Click "Shipping" tab
                var shippingTab = driver.FindElement(By.Id("4"));
                shippingTab.Click();

                // 7. Click "Delivered" tab
                var deliveredTab = driver.FindElement(By.Id("5"));
                deliveredTab.Click();

                // 8. Click "Completed" tab
                var completedTab = driver.FindElement(By.Id("6"));
                completedTab.Click();

                // 9. Click "Cancelled" tab
                var cancelledTab = driver.FindElement(By.Id("7"));
                cancelledTab.Click();

                Console.WriteLine("Test U-13: PASSED - Successfully displayed order tracking information");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-13: FAILED - {e.Message}");
                throw;
            }
        }
        [Test]
        public void U_14_CancelOrder_Success()
        {
            // Test Case Information
            // ID: U-14
            // Description: Cancel order
            // Expected Result: Order is successfully canceled
            // Test Data: "email: test@gmail.com pass: Aa123456789!"

            try
            {
                // 1. Open browser and login
                driver.Navigate().GoToUrl(BaseUrl);

                var loginButton = driver.FindElement(By.Id("login-button"));
                loginButton.Click();

                var emailField = driver.FindElement(By.Name("email"));
                emailField.SendKeys("test@gmail.com");

                var passwordField = driver.FindElement(By.Name("password"));
                passwordField.SendKeys("Aa123456789!");

                var signInButton = driver.FindElement(By.XPath("//button[@type='submit']"));
                signInButton.Click();

                Thread.Sleep(2000);

                // Perform steps to place an order with Cash on Delivery (U-12)
                // 2. Click on menu icon to view product list
                var menuButton = driver.FindElement(By.Id("Menu"));
                menuButton.Click();

                // 3. Click on Milk icon
                var milkCategory = driver.FindElement(By.Id("1"));
                milkCategory.Click();

                // 4. Display list of products
                var productList = driver.FindElements(By.CssSelector("[class*='Milk_wrapper']"));
                Assert.IsTrue(productList.Count > 0, "Product list should be displayed");

                // 5. Select a product
                var product = driver.FindElement(By.CssSelector("[class*='ProductItem_wrapper']"));
                product.Click();

                // 6. Product information is displayed
                Thread.Sleep(1000);

                // 7. Click button to add to cart
                var addToCartButton = driver.FindElement(By.Id("add-cart"));
                addToCartButton.Click();

                // 8. Click cart button to view cart
                var cartButton = driver.FindElement(By.Id("btn-cart"));
                cartButton.Click();

                // 9. Click buy button
                var buyButton = driver.FindElement(By.Id("buy-order"));
                buyButton.Click();

                // 10. Click continue button
                var continueButton = driver.FindElement(By.Id("continue"));
                continueButton.Click();

                // 11. Choose Cash on Delivery tab
                var codTab = driver.FindElement(By.Id("2"));
                codTab.Click();

                // 12. Click confirm payment button
                var confirmPaymentButton = driver.FindElement(By.Id("confirm-payment"));
                confirmPaymentButton.Click();

                // 13. Verify order success message
                Thread.Sleep(2000);
                var orderSuccessMessage = driver.FindElement(By.CssSelector("[class*='OrderDone_title']"));
                Assert.IsTrue(orderSuccessMessage.Text.Contains("Đặt hàng thành công") ||
                             orderSuccessMessage.Text.Contains("Order successful"),
                             "Order success message should be displayed");

                // 2. Click history icon to view order status
                var historyIcon = driver.FindElement(By.Id("History"));
                historyIcon.Click();

                // 3. Click "Pending Confirmation" tab
                var pendingConfirmationTab = driver.FindElement(By.Id("2"));
                pendingConfirmationTab.Click();

                // 4. Click cancel order button
                var cancelOrderButton = driver.FindElement(By.Id("cancel"));
                cancelOrderButton.Click();

                // 5. Select reason for cancellation
                var reasonOption = driver.FindElement(By.Id("1"));
                reasonOption.Click();

                // 6. Click confirm cancellation button
                var confirmCancelButton = driver.FindElement(By.Id("confirm-cancel"));
                confirmCancelButton.Click();

                // 7. Click "Cancelled" tab to verify order is canceled
                var cancelledTab = driver.FindElement(By.Id("7"));
                cancelledTab.Click();

                // Verify order is in canceled state
                var cancelledOrder = driver.FindElement(By.CssSelector("[class*='OrderCancelled']"));
                Assert.IsTrue(cancelledOrder.Displayed, "Order should be displayed in the cancelled state");

                Console.WriteLine("Test U-14: PASSED - Order canceled successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-14: FAILED - {e.Message}");
                throw;
            }
        }
        [Test]
        public void U_15_SubmitProductReview_Success()
        {
            // Test Case Information
            // ID: U-15
            // Description: Submit product review
            // Expected Result: Review is displayed under the product
            // Test Data: "email: test@gmail.com pass: Aa123456789!"

            try
            {
                // 1. Open browser and login
                driver.Navigate().GoToUrl(BaseUrl);

                var loginButton = driver.FindElement(By.Id("login-button"));
                loginButton.Click();

                var emailField = driver.FindElement(By.Name("email"));
                emailField.SendKeys("test@gmail.com");

                var passwordField = driver.FindElement(By.Name("password"));
                passwordField.SendKeys("Aa123456789!");

                var signInButton = driver.FindElement(By.XPath("//button[@type='submit']"));
                signInButton.Click();

                Thread.Sleep(2000);

                // Perform steps to place an order with Cash on Delivery (U-12)
                // 2. Click on menu icon to view product list
                var menuButton = driver.FindElement(By.Id("Menu"));
                menuButton.Click();

                // 3. Click on Milk icon
                var milkCategory = driver.FindElement(By.Id("1"));
                milkCategory.Click();

                // 4. Display list of products
                var productList = driver.FindElements(By.CssSelector("[class*='Milk_wrapper']"));
                Assert.IsTrue(productList.Count > 0, "Product list should be displayed");

                // 5. Select a product
                var product = driver.FindElement(By.CssSelector("[class*='ProductItem_wrapper']"));
                product.Click();

                // 6. Product information is displayed
                Thread.Sleep(1000);

                // 7. Click button to add to cart
                var addToCartButton = driver.FindElement(By.Id("add-cart"));
                addToCartButton.Click();

                // 8. Click cart button to view cart
                var cartButton = driver.FindElement(By.Id("btn-cart"));
                cartButton.Click();

                // 9. Click buy button
                var buyButton = driver.FindElement(By.Id("buy-order"));
                buyButton.Click();

                // 10. Click continue button
                var continueButton = driver.FindElement(By.Id("continue"));
                continueButton.Click();

                // 11. Choose Cash on Delivery tab
                var codTab = driver.FindElement(By.Id("2"));
                codTab.Click();

                // 12. Click confirm payment button
                var confirmPaymentButton = driver.FindElement(By.Id("confirm-payment"));
                confirmPaymentButton.Click();

                // 13. Verify order success message
                Thread.Sleep(2000);
                var orderSuccessMessage = driver.FindElement(By.CssSelector("[class*='OrderDone_title']"));
                Assert.IsTrue(orderSuccessMessage.Text.Contains("Đặt hàng thành công") ||
                             orderSuccessMessage.Text.Contains("Order successful"),
                             "Order success message should be displayed");

                // 2. Click history icon to view order status
                var historyIcon = driver.FindElement(By.Id("History"));
                historyIcon.Click();

                // 3. Click "Delivered" tab
                var deliveredTab = driver.FindElement(By.Id("5"));
                deliveredTab.Click();

                // 4. Click "Received" button
                var receivedButton = driver.FindElement(By.Id("received"));
                receivedButton.Click();

                // 5. Click "Completed" tab
                var completedTab = driver.FindElement(By.Id("6"));
                completedTab.Click();

                // 6. Click "Show Info" button
                var showInfoButton = driver.FindElement(By.Id("show-info"));
                showInfoButton.Click();

                // 7. Click "Review Product" button
                var reviewProductButton = driver.FindElement(By.Id("evaluated"));
                reviewProductButton.Click();

                // 8. Enter review details
                var reviewDetailField = driver.FindElement(By.Id("detail"));
                reviewDetailField.SendKeys("This is a great product!");

                // 9. Select rating
                var ratingSelect = driver.FindElement(By.Id("outlined-select-currency"));
                ratingSelect.Click();
                var ratingOption = driver.FindElement(By.XPath("//option[@value='3']"));
                ratingOption.Click();

                // 10. Click "Submit Review" button
                var submitReviewButton = driver.FindElement(By.Id("send-evaluated"));
                submitReviewButton.Click();

                // Verify review is displayed under the product
                Thread.Sleep(2000);
                var reviewText = driver.FindElement(By.CssSelector("[class*='Review_text']"));
                Assert.IsTrue(reviewText.Text.Contains("This is a great product!"), "Review should be displayed under the product");

                Console.WriteLine("Test U-15: PASSED - Review submitted successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-15: FAILED - {e.Message}");
                throw;
            }
        }

        [Test]
        public void U_16_UpdatePersonalInformation_Success()
        {
            // Test Case Information
            // ID: U-16
            // Description: Update personal information (name and phone)
            // Expected Result: Display success update notification
            // Test Data: "email: test@gmail.com pass: Aa123456789!"

            try
            {
                // 1. Open browser and login
                driver.Navigate().GoToUrl(BaseUrl);

                var loginButton = driver.FindElement(By.Id("login-button"));
                loginButton.Click();

                var emailField = driver.FindElement(By.Name("email"));
                emailField.SendKeys("test@gmail.com");

                var passwordField = driver.FindElement(By.Name("password"));
                passwordField.SendKeys("Aa123456789!");

                var signInButton = driver.FindElement(By.XPath("//button[@type='submit']"));
                signInButton.Click();

                Thread.Sleep(2000);

                // 2. Hover over avatar
                var avatar = driver.FindElement(By.Id("avatar"));
                var actions = new OpenQA.Selenium.Interactions.Actions(driver);
                actions.MoveToElement(avatar).Perform();

                // 3. Click on "My Account" menu
                var accountMenu = driver.FindElement(By.Id("account"));
                accountMenu.Click();

                // 4. Enter new name
                var nameField = driver.FindElement(By.Id("name"));
                nameField.Clear();
                nameField.SendKeys("New Name");

                // 5. Enter new phone number
                var phoneField = driver.FindElement(By.Id("phone"));
                phoneField.Clear();
                phoneField.SendKeys("1234567890");

                // 6. Click save button
                var saveButton = driver.FindElement(By.Id("save-button"));
                saveButton.Click();

                // 7. Verify success notification
                Thread.Sleep(2000);
                var successMessage = driver.FindElement(By.CssSelector(".success-message"));
                Assert.IsTrue(successMessage.Text.Contains("Cập nhật thành công"), "Success update notification should be displayed");

                Console.WriteLine("Test U-16: PASSED - Personal information updated successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-16: FAILED - {e.Message}");
                throw;
            }
        }

        [Test]
        public void U_18_Logout_Success()
        {
            // Test Case Information
            // ID: U-18
            // Description: Logout from account
            // Expected Result: User is logged out and redirected to home page
            // Test Data: "email: test@gmail.com pass: Aa123456789!"

            try
            {
                // 1. Open browser
                driver.Navigate().GoToUrl(BaseUrl);

                // Login first
                var loginButton = driver.FindElement(By.Id("login-button"));
                loginButton.Click();

                var emailField = driver.FindElement(By.Name("email"));
                emailField.SendKeys("test@gmail.com");

                var passwordField = driver.FindElement(By.Name("password"));
                passwordField.SendKeys("Aa123456789!");

                var signInButton = driver.FindElement(By.XPath("//button[@type='submit']"));
                signInButton.Click();

                Thread.Sleep(2000);

                // 2. Hover over avatar
                var avatar = driver.FindElement(By.Id("avatar"));
                var actions = new OpenQA.Selenium.Interactions.Actions(driver);
                actions.MoveToElement(avatar).Perform();

                // 3. Click on "My Account" menu
                var accountMenu = driver.FindElement(By.Id("account"));
                accountMenu.Click();

                // 4. Click logout button
                var logoutButton = driver.FindElement(By.Id("btn-logout"));
                logoutButton.Click();

                // 5. Verify successful logout
                Thread.Sleep(2000);

                // Check that login button is now visible (indicating successful logout)
                var loginButtonAfterLogout = driver.FindElement(By.Id("login-button"));
                Assert.IsTrue(loginButtonAfterLogout.Displayed, "Login button should be displayed after logout");

                // Verify URL is home page
                Assert.IsTrue(driver.Url.Contains(BaseUrl), "User should be redirected to home page after logout");

                Console.WriteLine("Test U-18: PASSED - Successfully logged out");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Test U-18: FAILED - {e.Message}");
                throw;
            }
        }
        private decimal ExtractPrice(string priceText)
        {
            // Extract numeric value from price text (removes currency symbols, etc.)
            string numericString = new string(priceText.Where(c => char.IsDigit(c) || c == '.').ToArray());
            return decimal.Parse(numericString, System.Globalization.CultureInfo.InvariantCulture);
        }
        [TearDown]
        public void TearDown()
        {
            driver.Quit();
        }
    }
}