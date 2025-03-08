// LoginPage.cs
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using System;

namespace MilkUI.Tests.PageObjects
{
    public class LoginPage
    {
        private readonly IWebDriver _driver;
        private readonly WebDriverWait _wait;

        public LoginPage(IWebDriver driver, WebDriverWait wait)
        {
            _driver = driver;
            _wait = wait;
        }

        private IWebElement EmailField => _wait.Until(ExpectedConditions.ElementToBeClickable(By.Name("email")));
        private IWebElement PasswordField => _wait.Until(ExpectedConditions.ElementToBeClickable(By.Name("password")));
        private IWebElement SignInButton => _wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//button[@type='submit']")));
        private IWebElement SignUpButton => _wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//button[contains(text(),'Sign Up')]")));


        public void Login(string email, string password)
        {
            EmailField.SendKeys(email);
            PasswordField.SendKeys(password);
            SignInButton.Click();
        }
        public void GoToSignUp()
        {
            SignUpButton.Click();
        }
    }
}

// HomePage.cs
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using System;
namespace MilkUI.Tests.PageObjects
{
    public class HomePage
    {
        private readonly IWebDriver _driver;
        private readonly WebDriverWait _wait;
        public HomePage(IWebDriver driver, WebDriverWait wait)
        {
            _driver = driver;
            _wait = wait;
        }
        private IWebElement LoginButton => _wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("login-button")));
        private IWebElement AvatarIcon => _wait.Until(ExpectedConditions.ElementIsVisible(By.Id("avatar")));
        private IWebElement MenuButton => _wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("Menu")));

        public void GoToLoginPage()
        {
            LoginButton.Click();
        }

        public bool IsLoggedIn()
        {
            try
            {
                return AvatarIcon.Displayed;
            }
            catch (NoSuchElementException)
            {
                return false;
            }
        }
        public void ClickMenu()
        {
            MenuButton.Click();
        }
    }
}
//ProductPage.cs
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using System;
namespace MilkUI.Tests.PageObjects
{
    public class ProductPage
    {
        private readonly IWebDriver _driver;
        private readonly WebDriverWait _wait;

        public ProductPage(IWebDriver driver, WebDriverWait wait)
        {
            _driver = driver;
            _wait = wait;
        }
        private IWebElement MilkCategory => _wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("1")));
        private IWebElement ProductItem => _wait.Until(ExpectedConditions.ElementToBeClickable(By.CssSelector("[class*='ProductItem_wrapper']")));
        private IWebElement AddQuantityButton => _wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("add-quantity-product")));
        private IWebElement AddToCartButton => _wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("add-cart")));
        //use data-testid is the best practice
        private IWebElement QuantityInput => _wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector("[data-testid='quantity-input']"))); // Assuming there's an input field showing the quantity
        private IWebElement Price => _wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector("[class*='Price_price']")));

        public void GoToMilkCategory()
        {
            MilkCategory.Click();
        }
        public void SelectProduct()
        {
            ProductItem.Click();
        }

        public void IncreaseQuantity()
        {
            AddQuantityButton.Click();
        }
        public void AddToCart()
        {
            AddToCartButton.Click();
        }
        public int GetQuantity()
        {
            return int.Parse(QuantityInput.GetAttribute("value"));
        }
        public decimal GetPrice()
        {
            return ExtractPrice(Price.Text);
        }
        private decimal ExtractPrice(string priceText)
        {
            // Extract numeric value from price text (removes currency symbols, etc.)
            string numericString = new string(priceText.Where(c => char.IsDigit(c) || c == '.').ToArray());
            return decimal.Parse(numericString, System.Globalization.CultureInfo.InvariantCulture);
        }
    }
}
//add other page objects