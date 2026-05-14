package com.flygulf.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "page_content")
@Data
public class PageContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String heroTitle;
    
    @Column(columnDefinition = "TEXT")
    private String heroDesc;
    
    private String heroButtonText;
    private String archiveTitle;
    private String archiveSub;
    
    @Column(columnDefinition = "TEXT")
    private String archiveDesc;
    
    private Integer successYears;
    private Integer captures;
    
    @Column(columnDefinition = "LONGTEXT")
    private String heroImage;
    
    @Column(columnDefinition = "LONGTEXT")
    private String secondImage;
}
