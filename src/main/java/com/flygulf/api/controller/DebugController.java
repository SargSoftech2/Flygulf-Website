package com.flygulf.api.controller;

import com.flygulf.api.model.User;
import com.flygulf.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debug")
@CrossOrigin(origins = "*")
public class DebugController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @GetMapping("/user-count")
    public String getUserCount() {
        long count = userRepository.count();
        return "Total users in database: " + count;
    }
}
