package com.thisara.LNF.service;

import com.thisara.LNF.dto.LoginRequest;
import com.thisara.LNF.entity.User;
import com.thisara.LNF.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authService = new AuthService(userRepository, passwordEncoder);
    }

    @Test
    void testLoginWithValidCredentials() {
        // Arrange
        User user = new User();
        user.setUsername("thisara");
        user.setPassword("encodedPassword123"); // This should be encoded password

        LoginRequest request = new LoginRequest();
        request.setUsername("thisara");
        request.setPassword("password123"); // Raw password from user input

        when(userRepository.findByUsername("thisara")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password123", "encodedPassword123")).thenReturn(true);

        // Act
        String result = authService.login(request);

        // Assert
        assertEquals("Login successful!", result);
        verify(userRepository).findByUsername("thisara");
        verify(passwordEncoder).matches("password123", "encodedPassword123");
    }

    @Test
    void testLoginWithInvalidPassword() {
        // Arrange
        User user = new User();
        user.setUsername("thisara");
        user.setPassword("encodedPassword123");

        LoginRequest request = new LoginRequest();
        request.setUsername("thisara");
        request.setPassword("wrongPass");

        when(userRepository.findByUsername("thisara")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPass", "encodedPassword123")).thenReturn(false);

        // Act
        String result = authService.login(request);

        // Assert
        assertEquals("Invalid credentials", result);
        verify(userRepository).findByUsername("thisara");
        verify(passwordEncoder).matches("wrongPass", "encodedPassword123");
    }

    @Test
    void testLoginWithNonExistingUser() {
        // Arrange
        LoginRequest request = new LoginRequest();
        request.setUsername("unknown");
        request.setPassword("password123");

        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        // Act
        String result = authService.login(request);

        // Assert
        assertEquals("User not found", result);
        verify(userRepository).findByUsername("unknown");
        verifyNoInteractions(passwordEncoder); // Password check shouldn't happen if user not found
    }

    @Test
    void testLoginWithMissingFields() {
        // Arrange
        LoginRequest request = new LoginRequest();
        request.setUsername("");
        request.setPassword("");

        // Act
        String result = authService.login(request);

        // Assert
        assertEquals("Username and password must not be empty", result);
        verifyNoInteractions(userRepository); // No DB call should happen for empty fields
        verifyNoInteractions(passwordEncoder);
    }
}