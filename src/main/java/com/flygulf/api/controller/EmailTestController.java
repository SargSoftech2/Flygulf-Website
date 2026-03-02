package com.flygulf.api.controller;

import com.flygulf.api.dto.ApiResponse;
import com.flygulf.api.model.User;
import com.flygulf.api.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("flygulf/api/test")
@CrossOrigin(origins = "*")
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    // @PostMapping("/send-test-email")
    // public ResponseEntity<String> sendTestEmail(@RequestBody TestEmailRequest request) {
    //     User testUser = new User();
    //     testUser.setFullName(request.getName());
    //     testUser.setEmail(request.getEmail());
    //     testUser.setPhone(request.getPhone());
    //     testUser.setCourse(request.getCourse());
    //     testUser.setPassword("dummy");

    //     emailService.sendRegistrationEmails(testUser);

    //     return ResponseEntity.ok("Emails sent successfully to customer and admin!");
    // }
@PostMapping("/send-test-email")
public ResponseEntity<String> sendTestEmail(@RequestBody TestEmailRequest request) {

    System.out.println("Email received from frontend: " + request.getEmail());

    User testUser = new User();
    testUser.setFullName(request.getName());
    testUser.setEmail(request.getEmail());
    testUser.setPhone(request.getPhone());
    testUser.setCourse(request.getCourse());
    testUser.setPassword("dummy");

    emailService.sendRegistrationEmails(testUser);

    return ResponseEntity.ok("Emails sent successfully to customer and admin!");
}
    @GetMapping("/send-simple-test")
    public ResponseEntity<String> sendSimpleTest() {
        try {
            User testUser = new User();
            testUser.setFullName("Test Student");
            testUser.setEmail("test@example.com");
            testUser.setPhone("1234567890");
            testUser.setCourse("Test Course");
            testUser.setPassword("dummy");

            emailService.sendRegistrationEmails(testUser);

            return ResponseEntity.ok("Test email sent to test@example.com and admin!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Email failed: " + e.getMessage());
        }
    }
}

class TestEmailRequest {
    private String name;
    private String email;
    private String phone;
    private String course;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
}
