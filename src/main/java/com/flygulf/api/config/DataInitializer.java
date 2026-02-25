package com.flygulf.api.config;

import com.flygulf.api.model.User;
import com.flygulf.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create a test user if not exists
        if (userRepository.findByEmail("admin@flygulf.com").isEmpty()) {
            User testUser = new User();
            testUser.setFullName("Admin User");
            testUser.setEmail("admin@flygulf.com");
            testUser.setPassword(passwordEncoder.encode("admin123"));
            testUser.setPhone("1234567890");
            testUser.setCourse("N/A");
            userRepository.save(testUser);
            System.out.println("✓ Test user created: admin@flygulf.com / admin123");
        }
    }
}
