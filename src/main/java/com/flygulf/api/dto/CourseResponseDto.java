package com.flygulf.api.dto;

import com.flygulf.api.model.Status;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseResponseDto {

    private Long id;
    private String courseName;
    private String shortForm;
    private String shortDesc;

    // All images are returned as Base64 data URLs → "data:image/jpeg;base64,..."
    // Angular uses them directly: <img [src]="course.bannerImage">
    private String bannerImage;
    private String cardImage;
    private String logo;

    private String aboutTitle;
    private String aboutImage;
    private String aboutTotalExperience;
    private String aboutDescription;
    private List<String> features;      // parsed from "feat1,feat2" → ["feat1","feat2"]

    private String courseDetailTitle;
    private Integer courseHours;
    private String intensive;
    private String courseDetailImage;

    private Status status;
    private Boolean deleted;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime updatedAt;
    private String updatedBy;

    // Nested data from related tables
    private CourseOverviewDto overview;
    private List<DesignCardDto> designCards;
    private List<CourseContentDto> contents;
    private List<BenefitDto> benefits;

    // ── Nested DTO for TABLE 2 ──
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class CourseOverviewDto {
        private Long id;
        private String title;
        private String subTitle;
        private String description;
        private String majorConceptHeading;
        private List<String> majorConcepts;  // parsed from "c1|c2|c3" → ["c1","c2","c3"]
        private Status status;
    }

    // ── Nested DTO for TABLE 3 ──
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class DesignCardDto {
        private Long id;
        private String logo;             // Base64
        private String colorBackground;
        private String title;
        private String description;
        private Integer sortOrder;
        private Status status;
    }

    // ── Nested DTO for TABLE 4 ──
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class CourseContentDto {
        private Long id;
        private String title;
        private Integer sortOrder;
        private Status status;
    }

    // ── Nested DTO for TABLE 5 ──
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class BenefitDto {
        private Long id;
        private String logo;             // Base64
        private String title;
        private String description;
        private Integer sortOrder;
        private Status status;
    }
}