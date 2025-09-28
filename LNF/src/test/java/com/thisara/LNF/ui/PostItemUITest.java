package com.thisara.LNF.ui;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class PostItemUITest {

    private WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        driver.get("http://localhost:5173/signin");

        // Login first
        driver.findElement(By.id("username")).sendKeys("thisara");
        driver.findElement(By.id("password")).sendKeys("1234");
        driver.findElement(By.id("loginBtn")).click();
    }

    @Test
    void testPostLostItem() {
        driver.get("http://localhost:5173/report-lost");

        driver.findElement(By.id("title")).sendKeys("Lost Wallet");
        driver.findElement(By.id("category")).sendKeys("Accessories");
        driver.findElement(By.id("description")).sendKeys("Black leather wallet lost near library.");
        driver.findElement(By.id("location")).sendKeys("University Library");
        driver.findElement(By.id("submitBtn")).click();

        // Assert success message or redirect
        WebElement successMsg = driver.findElement(By.id("successMessage"));
        assertTrue(successMsg.getText().contains("Item posted successfully"));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
