package com.flygulf.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "course_overviews")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseOverview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One course → one overview (1:1 relationship)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false, unique = true)
    private Course course;

    @Column(name = "title", length = 300)
    private String title;

    @Column(name = "sub_title", length = 400)
    private String subTitle;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "major_concept_heading", length = 300)
    private String majorConceptHeading;
    // Example: "The ACLS Provider Course Emphasizes 3 Major Concepts:"

    // Multiple concepts stored pipe-separated: "concept1|concept2|concept3"
    // Parsed into List<String> in Java when returned to frontend
    @Column(name = "major_concepts", columnDefinition = "TEXT")
    private String majorConcepts;

    // ── Audit Columns ──
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
}