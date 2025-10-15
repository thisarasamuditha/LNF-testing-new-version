package com.thisara.LNF.controller;

import com.thisara.LNF.dto.LoginRequest;
import com.thisara.LNF.dto.RegisterRequest;
import com.thisara.LNF.entity.User;
import com.thisara.LNF.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}) // allow React frontend
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

//    @PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
//        return ResponseEntity.ok(authService.register(request));
//    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        String result = authService.register(request);
        return ResponseEntity.ok(Map.of("message", result));
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
//        return ResponseEntity.ok(authService.login(request));
//    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        // Perform authentication using the request
        String result = authService.login(request);

        // If login is successful, retrieve user data
        if ("Login successful!".equals(result)) {
            // Retrieve user data by username
            User user = authService.getUserByUsername(request.getUsername());

            // Create a response map that includes the message and user data
            Map<String, Object> response = new HashMap<>();
            response.put("message", result);
            response.put("user", new HashMap<String, Object>() {{
                put("id", user.getId());
                put("username", user.getUsername());
                put("email", user.getEmail());
                put("contactInfo", user.getContactInfo());
            }});

            // Return response with status 200 (OK)
            return ResponseEntity.ok(response);
        }

        // If login failed, return an error message
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", result));
    }
}

