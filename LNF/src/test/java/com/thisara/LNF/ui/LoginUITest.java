package com.thisara.LNF.ui;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.Duration;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginUITest {

    private WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
    }

    @Test
    void testLoginWithValidCredentials() throws InterruptedException {
        driver.get("http://localhost:5173/signin");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("username")));
        usernameField.sendKeys("thisara");

        WebElement passwordField = driver.findElement(By.id("password"));
        passwordField.sendKeys("1234");

        WebElement loginBtn = driver.findElement(By.id("loginBtn"));
        loginBtn.click();
        Thread.sleep(500); // brief pause before click

        // Optional: wait a bit to observe navigation
        Thread.sleep(1000);

        // Assert redirected to dashboard
        wait.until(ExpectedConditions.urlContains("/"));
        assertTrue(driver.getCurrentUrl().contains("/"));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
