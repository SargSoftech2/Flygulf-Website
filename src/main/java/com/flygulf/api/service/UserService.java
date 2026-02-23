package com.flygulf.api.service;

import com.flygulf.api.model.User;
import com.flygulf.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

  public User registerUser(User user) {
    // FIX: findByEmail returns an Optional, so use .isPresent()
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        throw new RuntimeException("User already exists!");
    }
    return userRepository.save(user);
  }
}