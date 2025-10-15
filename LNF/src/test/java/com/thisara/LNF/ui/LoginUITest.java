package com.thisara.LNF.ui;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.Alert;
import org.openqa.selenium.TimeoutException;

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
    void testLoginWithValidCredentials() {
        driver.get("http://localhost:3000/signin");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("username")));
        usernameField.sendKeys("thisara");
        

        WebElement passwordField = driver.findElement(By.id("password"));
        passwordField.sendKeys("1234");

        WebElement loginBtn = driver.findElement(By.id("loginBtn"));
        loginBtn.click();

        // Handle success alert if it appears
        WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(3));
        try {
            Alert alert = shortWait.until(ExpectedConditions.alertIsPresent());
            // Optionally assert alert text
            // Assertions.assertEquals("Login successful!", alert.getText());
            alert.accept();
        } catch (TimeoutException ignored) {
            // No alert appeared; proceed
        }

        // Assert redirected to dashboard
    wait.until(ExpectedConditions.urlToBe("http://localhost:3000/"));
    assertTrue(driver.getCurrentUrl().equals("http://localhost:3000/"),
        () -> "Expected redirect to index '/', but was: " + driver.getCurrentUrl());
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
