package com.flygulf.api.controller;

import com.flygulf.api.dto.ApiResponse;
import com.flygulf.api.dto.CourseResponseDto;
import com.flygulf.api.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    // ─── TABLE 1: Course ─────────────────────────────────────────

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CourseResponseDto>> createCourse(
            @RequestParam String courseName,
            @RequestParam String shortForm,
            @RequestParam(required = false) String shortDesc,
            @RequestParam(required = false) String aboutTitle,
            @RequestParam(required = false) String aboutTotalExperience,
            @RequestParam(required = false) String aboutDescription,
            @RequestParam(required = false) String features,
            @RequestParam(required = false) String courseDetailTitle,
            @RequestParam(required = false) Integer courseHours,
            @RequestParam(required = false) String intensive,
            @RequestParam(defaultValue = "admin") String createdBy,
            @RequestPart(required = false) MultipartFile bannerImage,
            @RequestPart(required = false) MultipartFile cardImage,
            @RequestPart(required = false) MultipartFile logo,
            @RequestPart(required = false) MultipartFile aboutImage,
            @RequestPart(required = false) MultipartFile courseDetailImage
    ) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("Course created",
                courseService.createCourse(courseName, shortForm, shortDesc, aboutTitle,
                        aboutTotalExperience, aboutDescription, features,
                        courseDetailTitle, courseHours, intensive, createdBy,
                        bannerImage, cardImage, logo, aboutImage, courseDetailImage)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponseDto>>> getAllCourses() {
        return ResponseEntity.ok(ApiResponse.ok("All courses", courseService.getAllCourses()));
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<CourseResponseDto>>> getActiveCourses() {
        return ResponseEntity.ok(ApiResponse.ok("Active courses", courseService.getActiveCourses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponseDto>> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Course detail", courseService.getCourseById(id)));
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CourseResponseDto>> updateCourse(
            @PathVariable Long id,
            @RequestParam(required = false) String courseName,
            @RequestParam(required = false) String shortForm,
            @RequestParam(required = false) String shortDesc,
            @RequestParam(required = false) String aboutTitle,
            @RequestParam(required = false) String aboutTotalExperience,
            @RequestParam(required = false) String aboutDescription,
            @RequestParam(required = false) String features,
            @RequestParam(required = false) String courseDetailTitle,
            @RequestParam(required = false) Integer courseHours,
            @RequestParam(required = false) String intensive,
            @RequestParam(defaultValue = "admin") String updatedBy,
            @RequestPart(required = false) MultipartFile bannerImage,
            @RequestPart(required = false) MultipartFile cardImage,
            @RequestPart(required = false) MultipartFile logo,
            @RequestPart(required = false) MultipartFile aboutImage,
            @RequestPart(required = false) MultipartFile courseDetailImage
    ) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("Course updated",
                courseService.updateCourse(id, courseName, shortForm, shortDesc, aboutTitle,
                        aboutTotalExperience, aboutDescription, features,
                        courseDetailTitle, courseHours, intensive, updatedBy,
                        bannerImage, cardImage, logo, aboutImage, courseDetailImage)));
    }

    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<ApiResponse<CourseResponseDto>> toggleStatus(
            @PathVariable Long id,
            @RequestParam(defaultValue = "admin") String updatedBy) {
        return ResponseEntity.ok(ApiResponse.ok("Status toggled",
                courseService.toggleStatus(id, updatedBy)));
    }

    @DeleteMapping("/{id}/soft")
    public ResponseEntity<ApiResponse<Void>> softDelete(
            @PathVariable Long id,
            @RequestParam(defaultValue = "admin") String updatedBy) {
        courseService.softDelete(id, updatedBy);
        return ResponseEntity.ok(ApiResponse.ok("Course soft-deleted", null));
    }

    @DeleteMapping("/{id}/hard")
    public ResponseEntity<ApiResponse<Void>> hardDelete(@PathVariable Long id) {
        courseService.hardDelete(id);
        return ResponseEntity.ok(ApiResponse.ok("Course permanently deleted", null));
    }

    // ─── TABLE 2: Overview ───────────────────────────────────────

    @PostMapping("/{courseId}/overview")
    public ResponseEntity<ApiResponse<CourseResponseDto.CourseOverviewDto>> saveOverview(
            @PathVariable Long courseId,
            @RequestParam String title,
            @RequestParam(required = false) String subTitle,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String majorConceptHeading,
            @RequestParam(required = false) String majorConcepts,
            @RequestParam(defaultValue = "admin") String actor) {
        return ResponseEntity.ok(ApiResponse.ok("Overview saved",
                courseService.saveOverview(courseId, title, subTitle,
                        description, majorConceptHeading, majorConcepts, actor)));
    }

    @DeleteMapping("/overview/{overviewId}/soft")
    public ResponseEntity<ApiResponse<Void>> softDeleteOverview(
            @PathVariable Long overviewId,
            @RequestParam(defaultValue = "admin") String actor) {
        courseService.softDeleteOverview(overviewId, actor);
        return ResponseEntity.ok(ApiResponse.ok("Overview soft-deleted", null));
    }

    // ─── TABLE 3: Design Cards ───────────────────────────────────

    @GetMapping("/{courseId}/design-cards")
    public ResponseEntity<ApiResponse<List<CourseResponseDto.DesignCardDto>>> getCards(
            @PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.ok("Design cards",
                courseService.getCardsByCourse(courseId)));
    }

    @PostMapping(value = "/{courseId}/design-cards", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CourseResponseDto.DesignCardDto>> addCard(
            @PathVariable Long courseId,
            @RequestParam(required = false) String colorBackground,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(defaultValue = "admin") String actor,
            @RequestPart(required = false) MultipartFile logo) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("Card added",
                courseService.addDesignCard(courseId, colorBackground,
                        title, description, sortOrder, actor, logo)));
    }

    @PutMapping(value = "/design-cards/{cardId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CourseResponseDto.DesignCardDto>> updateCard(
            @PathVariable Long cardId,
            @RequestParam(required = false) String colorBackground,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(defaultValue = "admin") String actor,
            @RequestPart(required = false) MultipartFile logo) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("Card updated",
                courseService.updateDesignCard(cardId, colorBackground,
                        title, description, sortOrder, actor, logo)));
    }

    @DeleteMapping("/design-cards/{cardId}/soft")
    public ResponseEntity<ApiResponse<Void>> softDeleteCard(
            @PathVariable Long cardId,
            @RequestParam(defaultValue = "admin") String actor) {
        courseService.softDeleteCard(cardId, actor);
        return ResponseEntity.ok(ApiResponse.ok("Card soft-deleted", null));
    }

    // ─── TABLE 4: Course Contents ────────────────────────────────

    @GetMapping("/{courseId}/contents")
    public ResponseEntity<ApiResponse<List<CourseResponseDto.CourseContentDto>>> getContents(
            @PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.ok("Contents",
                courseService.getContentsByCourse(courseId)));
    }

    @PostMapping("/{courseId}/contents")
    public ResponseEntity<ApiResponse<CourseResponseDto.CourseContentDto>> addContent(
            @PathVariable Long courseId,
            @RequestParam String title,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(defaultValue = "admin") String actor) {
        return ResponseEntity.ok(ApiResponse.ok("Content added",
                courseService.addContent(courseId, title, sortOrder, actor)));
    }

    @PutMapping("/contents/{contentId}")
    public ResponseEntity<ApiResponse<CourseResponseDto.CourseContentDto>> updateContent(
            @PathVariable Long contentId,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(defaultValue = "admin") String actor) {
        return ResponseEntity.ok(ApiResponse.ok("Content updated",
                courseService.updateContent(contentId, title, sortOrder, actor)));
    }

    @DeleteMapping("/contents/{contentId}/soft")
    public ResponseEntity<ApiResponse<Void>> softDeleteContent(
            @PathVariable Long contentId,
            @RequestParam(defaultValue = "admin") String actor) {
        courseService.softDeleteContent(contentId, actor);
        return ResponseEntity.ok(ApiResponse.ok("Content soft-deleted", null));
    }

    // ─── TABLE 5: Benefits ───────────────────────────────────────

    @GetMapping("/{courseId}/benefits")
    public ResponseEntity<ApiResponse<List<CourseResponseDto.BenefitDto>>> getBenefits(
            @PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.ok("Benefits",
                courseService.getBenefitsByCourse(courseId)));
    }

    @PostMapping(value = "/{courseId}/benefits", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CourseResponseDto.BenefitDto>> addBenefit(
            @PathVariable Long courseId,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(defaultValue = "admin") String actor,
            @RequestPart(required = false) MultipartFile logo) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("Benefit added",
                courseService.addBenefit(courseId, title, description, sortOrder, actor, logo)));
    }

    @PutMapping(value = "/benefits/{benefitId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CourseResponseDto.BenefitDto>> updateBenefit(
            @PathVariable Long benefitId,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(defaultValue = "admin") String actor,
            @RequestPart(required = false) MultipartFile logo) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("Benefit updated",
                courseService.updateBenefit(benefitId, title, description, sortOrder, actor, logo)));
    }

    @DeleteMapping("/benefits/{benefitId}/soft")
    public ResponseEntity<ApiResponse<Void>> softDeleteBenefit(
            @PathVariable Long benefitId,
            @RequestParam(defaultValue = "admin") String actor) {
        courseService.softDeleteBenefit(benefitId, actor);
        return ResponseEntity.ok(ApiResponse.ok("Benefit soft-deleted", null));
    }
}