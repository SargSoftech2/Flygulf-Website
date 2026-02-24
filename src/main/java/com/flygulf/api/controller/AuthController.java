package com.flygulf.api.controller;

import com.flygulf.api.dto.ApiResponse;
import com.flygulf.api.dto.LoginRequest;
import com.flygulf.api.dto.LoginResponse;
import com.flygulf.api.dto.UpdatePasswordRequest;
import com.flygulf.api.security.JwtUtil;
import com.flygulf.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout() {
        // JWT is stateless, logout is handled on client side by removing token
        return ResponseEntity.ok(new ApiResponse(true, "Logged out successfully"));
    }

    @PutMapping("/update-password")
    public ResponseEntity<ApiResponse> updatePassword(
            @RequestBody UpdatePasswordRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            jakarta.servlet.http.HttpServletRequest httpRequest) {
        try {
            System.out.println("Update password called");
            System.out.println("Auth header from @RequestHeader: " + authHeader);
            System.out.println("Auth header from HttpServletRequest: " + httpRequest.getHeader("Authorization"));
            System.out.println("All headers:");
            java.util.Enumeration<String> headerNames = httpRequest.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                System.out.println(headerName + ": " + httpRequest.getHeader(headerName));
            }
            
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Authorization header required"));
            }
            
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            
            System.out.println("Extracted username: " + username);
            
            authService.updatePassword(username, request);
            return ResponseEntity.ok(new ApiResponse(true, "Password updated successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
}
