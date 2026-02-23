package com.flygulf.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity 
@Table(name = "users") 
@Data 
@NoArgsConstructor // Added for Hibernate to create instances
@AllArgsConstructor // Added for easier testing
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName; // Matches "Your Name" field
    
    @Column(unique = true, nullable = false)
    private String email;    // Matches "Email Address" field
    
    private String phone;    // Matches "Phone Number" field

    private String course;   // Added to match "Select Course of Interest"

    // If you aren't using a password field in that specific popup, 
    // you can keep it or remove it based on your security plan.
    private String password; 
}