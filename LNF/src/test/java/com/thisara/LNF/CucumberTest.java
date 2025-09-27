package com.thisara.LNF;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = "com.thisara.LNF.steps",
    plugin = {"pretty", "html:target/cucumber-reports.html"},
    monochrome = true
)
public class CucumberTest {
}
