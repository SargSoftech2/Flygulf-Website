package com.flygulf.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "contact_messages")
@Data
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String subject;
    
    @Column(columnDefinition = "TEXT") // Allows for long messages
    private String message;


    @Column(name = "is_new", nullable = false)
private boolean isNew = true; // ✅ default true when saved

// getter & setter
public boolean isNew() { return isNew; }
public void setNew(boolean isNew) { this.isNew = isNew; }
}