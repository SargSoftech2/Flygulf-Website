package com.flygulf.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "gallery_items")
@Data
public class GalleryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String subtitle;
    private String category;
    
    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;
}
