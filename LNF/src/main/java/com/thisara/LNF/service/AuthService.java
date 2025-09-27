package com.thisara.LNF.service;

import com.thisara.LNF.dto.LoginRequest;
import com.thisara.LNF.dto.RegisterRequest;
import com.thisara.LNF.entity.User;
import com.thisara.LNF.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Username already exists!";
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already in use!";
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .contactInfo(request.getContactInfo())
                .build();

        userRepository.save(user);
        return "User registered successfully!";
    }

    // this method handles user login
    // update this method to return specific messages for different failure cases

    public String login(LoginRequest request) {
        // Check for empty fields first
        if (request.getUsername() == null || request.getUsername().trim().isEmpty() || 
            request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            return "Username and password must not be empty";
        }
        
        // Find user
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        
        if (userOpt.isEmpty()) {
            return "User not found";
        }
        
        User user = userOpt.get();
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Login successful!";
        }
        
        return "Invalid credentials";
    }

    

    public User getUserByUsername(String username) {
        // Retrieve user by username
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}


