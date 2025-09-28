import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumTest {
    public static void main(String[] args) throws InterruptedException {
        // Optional: point directly to chromedriver.exe if PATH is not set
        // System.setProperty("webdriver.chrome.driver", "C:\\chromedriver\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        System.out.println("Page title: " + driver.getTitle());
        driver.wait(2000); // wait for 2 seconds to see the browser
        driver.quit();
    }
}
