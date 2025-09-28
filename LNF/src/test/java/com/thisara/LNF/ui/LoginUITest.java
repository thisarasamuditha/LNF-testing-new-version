package com.thisara.LNF.ui;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginUITest {

    private WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
    }

    @Test
    void testLoginWithValidCredentials() {
        driver.get("http://localhost:5173/signin");

        driver.findElement(By.id("username")).sendKeys("thisara");
        driver.findElement(By.id("password")).sendKeys("1234");
        driver.findElement(By.id("loginBtn")).click();

        // Assert redirected to dashboard
        assertTrue(driver.getCurrentUrl().contains("dashboard"));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
