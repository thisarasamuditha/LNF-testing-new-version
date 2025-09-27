package com.thisara.LNF.steps;

import com.thisara.LNF.entity.User;
import com.thisara.LNF.repository.UserRepository;
import com.thisara.LNF.service.AuthService;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.thisara.LNF.dto.LoginRequest;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class LoginSteps {

    private AuthService authService;
    private String result;

    private UserRepository userRepository = Mockito.mock(UserRepository.class);
    private PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);

    private User testUser;

    @Given("a user exists with username {string} and password {string}")
    public void a_user_exists(String username, String password) {
        testUser = new User();
        testUser.setUsername(username);
        testUser.setPassword("encoded" + password); // Simulate encoded password

        Mockito.when(userRepository.findByUsername(username)).thenReturn(Optional.of(testUser));
        Mockito.when(passwordEncoder.matches(password, "encoded" + password)).thenReturn(true);

        authService = new AuthService(userRepository, passwordEncoder);
    }

    @Given("no user exists with username {string}")
    public void no_user_exists(String username) {
        Mockito.when(userRepository.findByUsername(username)).thenReturn(Optional.empty());
        authService = new AuthService(userRepository, passwordEncoder);
    }

    @When("the user tries to login with username {string} and password {string}")
    public void the_user_tries_to_login(String username, String password) {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);
        try {
            result = authService.login(loginRequest);
        } catch (Exception e) {
            result = "ERROR: " + e.getMessage();
        }
    }

    @Then("login should be successful")
    public void login_should_be_successful() {
        assertEquals("Login successful!", result);
    }

    @Then("login should fail")
    public void login_should_fail() {
        assertNotEquals("Login successful!", result);
    }

    @Then("login should fail with message {string}")
    public void login_should_fail_with_message(String expectedMessage) {
        assertEquals(expectedMessage, result);
    }
}
