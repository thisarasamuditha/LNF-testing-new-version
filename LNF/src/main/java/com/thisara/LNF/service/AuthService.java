package com.thisara.LNF.service;

import com.thisara.LNF.dto.LoginRequest;
import com.thisara.LNF.dto.RegisterRequest;
import com.thisara.LNF.entity.User;
import com.thisara.LNF.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public String login(LoginRequest request) {
        return userRepository.findByUsername(request.getUsername())
                .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> "Login successful!")
                .orElse("Invalid credentials");
    }

    public User getUserByUsername(String username) {
        // Retrieve user by username
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
