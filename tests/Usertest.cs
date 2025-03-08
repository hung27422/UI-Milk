using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml; // EPPlus
using SeleniumExtras.WaitHelpers;
using MilkUI.Tests.PageObjects; // Import your Page Objects
using System.Linq;

namespace MilkUI.Tests
{
    [TestFixture]
    public class UserTests
    {
        private IWebDriver _driver;
        private WebDriverWait _wait;
        private IConfiguration _configuration;
        private string _baseUrl;
        private int _timeoutSeconds;
        private string _screenshotDirectory;

        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            // Load configuration
            _configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();

            _baseUrl = _configuration["BaseUrl"];
            _timeoutSeconds = int.Parse(_configuration["TimeoutSeconds"]);
            _screenshotDirectory = Path.Combine(TestContext.CurrentContext.TestDirectory, _configuration["ScreenshotDirectory"]);
            // Create screenshot directory if it doesn't exist
            if (!Directory.Exists(_screenshotDirectory))
            {
                Directory.CreateDirectory(_screenshotDirectory);
            }
        }

        [SetUp]
        public void Setup()
        {
            // Initialize WebDriver based on configuration
            string browser = _configuration["Browser"]?.ToLower() ?? "chrome";
            _driver = browser switch
            {
                "firefox" => new FirefoxDriver(),
                _ => new ChromeDriver() // Default to Chrome
            };
            _driver.Manage().Window.Maximize();
            _wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(_timeoutSeconds));
        }
        private static IEnumerable<TestCaseData> GetTestDataFromExcel()
        {
            var testDataList = new List<TestCaseData>();
            var filePath = Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData.xlsx"); // Adjust path if needed
            // Ensure the file exists
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"Test data file not found: {filePath}");
            }
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial; // For EPPlus 5+

            using (var package = new ExcelPackage(new FileInfo(filePath)))
            {
                var worksheet = package.Workbook.Worksheets.FirstOrDefault(); // Get the first worksheet, or use worksheet name
                if (worksheet == null)
                {
                    throw new Exception("No worksheet found in the Excel file.");
                }
                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++) // Start from row 2 (assuming row 1 has headers)
                {
                    var testCaseId = worksheet.Cells[row, 1].Value?.ToString();
                    var email = worksheet.Cells[row, 2].Value?.ToString();
                    var password = worksheet.Cells[row, 3].Value?.ToString();
                    var expectedUrl = worksheet.Cells[row, 4].Value?.ToString();
                    var expectedResult = worksheet.Cells[row, 5].Value?.ToString();
                    //read quantity for U-09
                    var expectedQuantity = worksheet.Cells[row, 6].Value?.ToString(); // Expected result (e.g., quantity)


                    //check for null and empty
                    if (string.IsNullOrEmpty(testCaseId))
                    {
                        continue; // Skip rows with empty Test Case IDs
                    }

                    var testCaseData = new TestCaseData(testCaseId, email, password, expectedUrl, expectedResult, expectedQuantity);
                    testCaseData.SetName($"{testCaseId}"); // Optional: Give a name to each test case
                    testDataList.Add(testCaseData);
                }

            }

            return testDataList;
        }
        [Test, TestCaseSource(nameof(GetTestDataFromExcel))]
        public void UserTest(string testCaseId, string email, string password, string expectedUrl, string expectedResult, string expectedQuantity)

        {
            string actualResult = "";
            string status = "";
            string comments = "";

            try
            {
                _driver.Navigate().GoToUrl(_baseUrl);
                //use page objects
                var homePage = new HomePage(_driver, _wait);
                var loginPage = new LoginPage(_driver, _wait);
                var productPage = new ProductPage(_driver, _wait);

                switch (testCaseId)
                {
                    case "U-01":
                        homePage.GoToLoginPage();
                        loginPage.GoToSignUp();
                        loginPage.Login(email, password); // Use Page Object method

                        // Wait for either successful login or an error message
                        try
                        {
                            _wait.Until(ExpectedConditions.ElementIsVisible(By.Id("avatar")));
                            actualResult = "Pass";
                        }
                        catch (WebDriverTimeoutException)
                        {
                            actualResult = "Fail";  // Or get a more specific error message if possible
                            comments = "Login failed or avatar not visible.";
                        }
                        break;
                    case "U-09":
                        homePage.ClickMenu();
                        productPage.GoToMilkCategory();
                        productPage.SelectProduct();
                        var initialPrice = productPage.GetPrice();
                        productPage.IncreaseQuantity();
                        productPage.AddToCart();
                        //get the updated quantity and the updated price
                        int updatedQuantity = productPage.GetQuantity();
                        var updatedPrice = productPage.GetPrice();

                        // Assert that the new price is double the initial price (since we increased quantity by 1)
                        Assert.AreEqual(initialPrice * 2, updatedPrice, "Total price should update correctly after increasing quantity");

                        //parse expectedQuantity to int
                        if (int.TryParse(expectedQuantity, out int parsedQuantity))
                        {
                            actualResult = updatedQuantity == parsedQuantity ? "Pass" : "Fail";
                            if (actualResult == "Fail") comments = $"Quantity not updated correctly. Expected:{expectedQuantity}, but was {updatedQuantity}";
                        }
                        else
                        {
                            // Handle the case where expectedQuantity is not a valid integer
                            actualResult = "Fail";
                            comments = "Invalid expected quantity in Excel data.";
                        }
                        break;

                    // Add other cases (U-10, U-11, etc.) here, using Page Objects
                    default:
                        comments = "Test case ID not implemented.";
                        break;
                }
                status = (actualResult == expectedResult) ? "Pass" : "Fail";
                Assert.AreEqual(expectedResult, actualResult, $"Test Case {testCaseId} Failed. See Excel for details."); // Assert here for immediate feedback

            }
            catch (Exception ex)
            {
                actualResult = "Exception";
                status = "Fail";
                comments = $"Exception: {ex.Message}";
                TakeScreenshot(testCaseId);
                Console.WriteLine(comments); // Simulate logging
                // In a real project, use a logging library (Serilog, NLog, etc.)
                throw; // Re-throw to fail the test
            }
            finally
            {
                WriteResultsToExcel(testCaseId, actualResult, status, comments);
            }
        }
        private void WriteResultsToExcel(string testCaseId, string actualResult, string status, string comments)
        {
            var filePath = Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData.xlsx");
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (var package = new ExcelPackage(new FileInfo(filePath)))
            {
                var worksheet = package.Workbook.Worksheets.First(); // Or specify worksheet name
                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    if (worksheet.Cells[row, 1].Value?.ToString() == testCaseId)
                    {
                        worksheet.Cells[row, 7].Value = actualResult; // Column 6: Actual Result
                        worksheet.Cells[row, 8].Value = status;      // Column 7: Status
                        worksheet.Cells[row, 9].Value = comments;    // Column 8: Comments
                        break; // Exit loop after writing to the correct row
                    }
                }
                package.Save();
            }
        }

        private void TakeScreenshot(string testCaseId)
        {
            try
            {
                string screenshotFileName = $"{testCaseId}_{DateTime.Now:yyyyMMdd_HHmmss}.png";
                string screenshotFilePath = Path.Combine(_screenshotDirectory, screenshotFileName);
                ((ITakesScreenshot)_driver).GetScreenshot().SaveAsFile(screenshotFilePath, ScreenshotImageFormat.Png);
                Console.WriteLine($"Screenshot saved: {screenshotFilePath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to take screenshot: {ex.Message}");
            }
        }

        [TearDown]
        public void TearDown()
        {
            _driver?.Quit(); // Use null-conditional operator
        }
    }
}