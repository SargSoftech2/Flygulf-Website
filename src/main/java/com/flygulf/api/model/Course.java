package com.flygulf.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ── Images → stored as MEDIUMBLOB in MySQL (16MB max) ──
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "banner_image", columnDefinition = "MEDIUMBLOB")
    private byte[] bannerImage;

    @Column(name = "banner_image_type")
    private String bannerImageType;   // "image/jpeg"

    @Column(name = "banner_image_name")
    private String bannerImageName;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "card_image", columnDefinition = "MEDIUMBLOB")
    private byte[] cardImage;

    @Column(name = "card_image_type")
    private String cardImageType;

    @Column(name = "card_image_name")
    private String cardImageName;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "logo", columnDefinition = "MEDIUMBLOB")
    private byte[] logo;

    @Column(name = "logo_type")
    private String logoType;

    @Column(name = "logo_name")
    private String logoName;

    // ── Core Info ──
    @Column(name = "sort_order")
    private Integer sortOrder;

    @Column(name = "course_name", nullable = false, length = 200)
    private String courseName;

    @Column(name = "short_form", length = 20)
    private String shortForm;          // "ACLS"

    @Column(name = "short_desc", length = 500)
    private String shortDesc;

    // ── About Section ──
    @Column(name = "about_title", length = 300)
    private String aboutTitle;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "about_image", columnDefinition = "MEDIUMBLOB")
    private byte[] aboutImage;

    @Column(name = "about_image_type")
    private String aboutImageType;

    @Column(name = "about_image_name")
    private String aboutImageName;

    @Column(name = "about_total_experience", length = 100)
    private String aboutTotalExperience;   // "10+"

    @Column(name = "about_description", columnDefinition = "TEXT")
    private String aboutDescription;

    // ── Features: comma-separated in DB ──
    // Example stored value: "AHA Certified,Simulation Lab,Expert Instructors"
    @Column(name = "features", columnDefinition = "TEXT")
    private String features;

    // ── Course Detail ──
    @Column(name = "course_detail_title", length = 300)
    private String courseDetailTitle;

    @Column(name = "course_hours")
    private Integer courseHours;          // 16

    @Column(name = "intensive", length = 100)
    private String intensive;             // "2 Days Intensive"

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "course_detail_image", columnDefinition = "MEDIUMBLOB")
    private byte[] courseDetailImage;

    @Column(name = "course_detail_image_type")
    private String courseDetailImageType;

    @Column(name = "course_detail_image_name")
    private String courseDetailImageName;

    // ── Audit Columns (same on every table) ──
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private Status status = Status.ACTIVE;

    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private Boolean deleted = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "created_by", length = 100)
    private String createdBy;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    // ── Relationships to other 4 tables ──
    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private CourseOverview courseOverview;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<CourseDesignCard> designCards = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<CourseContent> courseContents = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<CourseBenefit> benefits = new ArrayList<>();
}