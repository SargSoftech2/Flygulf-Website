package com.flygulf.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginRequest {
    @JsonProperty("username")
    private String username;
    
    @JsonProperty("email")
    private String email;
    
    private String password;
    
    public String getUsername() {
        return username != null ? username : email;
    }
}
