package com.flygulf.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * DTO for Review responses - excludes binary data, includes metadata only
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long id;
    private String name;
    private String mobile;
    private String designation;
    private String course;
    private String review;
    private Integer rating;
    private boolean hasProfilePic;
    private boolean hasAudio;
    private boolean hasVideo;
    private String profilePicType;
    private String audioType;
    private String videoType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
