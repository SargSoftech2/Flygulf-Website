package com.flygulf.api.controller;

import com.flygulf.api.dto.ApiResponse;
import com.flygulf.api.model.ContactMessage;
import com.flygulf.api.repository.ContactRepository;
import com.flygulf.api.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ContactMessage message) {
        return ResponseEntity.ok(contactRepository.save(message));
    }
    
    @GetMapping("/enquiries")
    public ResponseEntity<?> getAllEnquiries(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Authorization required"));
            }
            
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            
            if (!jwtUtil.validateToken(token, username)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Invalid token"));
            }
            
            return ResponseEntity.ok(contactRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Authentication failed: " + e.getMessage()));
        }
    }
}