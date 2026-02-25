package com.flygulf.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Entity representing a review with multimedia content stored as compressed BLOBs
 */
@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, length = 20)
    private String mobile;
    
    private String designation;
    
    private String course;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String review;
    
    @Column(nullable = false)
    private Integer rating;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profilePic;
    
    @Column(length = 100)
    private String profilePicType;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] audio;
    
    @Column(length = 100)
    private String audioType;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] video;
    
    @Column(length = 100)
    private String videoType;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
