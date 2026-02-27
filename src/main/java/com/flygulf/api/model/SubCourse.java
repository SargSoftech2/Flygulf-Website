package com.flygulf.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "sub_courses", indexes = {
    @Index(name = "idx_subcourse_course_id", columnList = "course_id"),
    @Index(name = "idx_subcourse_deleted", columnList = "deleted"),
    @Index(name = "idx_subcourse_sort_order", columnList = "sort_order"),
    @Index(name = "idx_subcourse_course_deleted", columnList = "course_id, deleted")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SubCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Lob
    @Column(name = "card_image", columnDefinition = "LONGBLOB")
    private byte[] cardImage;

    @Column(name = "card_image_type")
    private String cardImageType;

    @Column(name = "card_image_name")
    private String cardImageName;

    @Column(name = "title", length = 200, nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "sort_order")
    @Builder.Default
    private Integer sortOrder = 0;

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
