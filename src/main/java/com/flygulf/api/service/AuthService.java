package com.flygulf.api.service;

import com.flygulf.api.dto.LoginRequest;
import com.flygulf.api.dto.LoginResponse;
import com.flygulf.api.dto.UpdatePasswordRequest;
import com.flygulf.api.model.User;
import com.flygulf.api.repository.UserRepository;
import com.flygulf.api.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        System.out.println("AuthService.login - Looking for user: " + request.getUsername());
        Optional<User> userOpt = userRepository.findByEmail(request.getUsername());
        
        if (userOpt.isEmpty()) {
            System.err.println("User not found: " + request.getUsername());
            throw new RuntimeException("Invalid credentials");
        }

        User user = userOpt.get();
        System.out.println("User found: " + user.getEmail());
        System.out.println("Stored password hash: " + user.getPassword());
        System.out.println("Checking password match...");
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.err.println("Password mismatch for user: " + request.getUsername());
            throw new RuntimeException("Invalid credentials");
        }

        System.out.println("Password matched! Generating token...");
        String token = jwtUtil.generateToken(user.getEmail());
        
        return new LoginResponse(token, user.getFullName(), user.getEmail(), "Login successful");
    }

    public void updatePassword(String username, UpdatePasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("New password and confirm password do not match");
        }

        Optional<User> userOpt = userRepository.findByEmail(username);
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();
        
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
