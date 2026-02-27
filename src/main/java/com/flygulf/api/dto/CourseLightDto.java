package com.flygulf.api.dto;

import com.flygulf.api.model.Status;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseLightDto {
    private Long id;
    private String courseName;
    private String shortForm;
    private String shortDesc;
    private String aboutTitle;
    private String aboutTotalExperience;
    private Integer courseHours;
    private String intensive;
    private Status status;
    
    // Only filenames - frontend should construct image URL
    private String bannerImageName;
    private String cardImageName;
    private String logoName;
}
