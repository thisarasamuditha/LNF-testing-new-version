package com.thisara.LNF.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor   // <-- adds the (String username, String password) constructor
@NoArgsConstructor  // Adds LoginRequest() constructor
public class LoginRequest {
    private String username;
    private String password;
}
