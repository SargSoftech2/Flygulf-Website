package com.flygulf.api.dto;

import com.flygulf.api.model.Status;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseLightDto {
    private Long id;
    private String courseName;
    private String shortForm;
    private String shortDesc;
    private Integer sortOrder;
    private Integer courseHours;
    private String intensive;
    
    // Only filenames - frontend constructs image URL
    private String cardImageName;
    private String logoName;
}
