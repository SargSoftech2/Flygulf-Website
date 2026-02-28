package com.flygulf.api.controller;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.flygulf.api.dto.ApiResponse;
import com.flygulf.api.dto.CourseLightDto;
import com.flygulf.api.dto.CourseResponseDto;
import com.flygulf.api.service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("flygulf/api/flygulf/courses")
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
    public ResponseEntity<ApiResponse<List<CourseLightDto>>> getActiveCourses() {
        return ResponseEntity.ok(ApiResponse.ok("Active courses", courseService.getActiveCourses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponseDto>> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Course detail", courseService.getCourseById(id)));
    }

    // Debug endpoint to check if images exist
    @GetMapping("/{id}/images/check")
    public ResponseEntity<ApiResponse<Object>> checkImages(@PathVariable Long id) {
        CourseResponseDto course = courseService.getCourseById(id);
        return ResponseEntity.ok(ApiResponse.ok("Image check", java.util.Map.of(
            "bannerImageName", course.getBannerImageName() != null ? course.getBannerImageName() : "NULL",
            "cardImageName", course.getCardImageName() != null ? course.getCardImageName() : "NULL",
            "logoName", course.getLogoName() != null ? course.getLogoName() : "NULL",
            "aboutImageName", course.getAboutImageName() != null ? course.getAboutImageName() : "NULL"
        )));
    }

    @GetMapping("/by-shortform/{shortForm}")
    public ResponseEntity<ApiResponse<CourseResponseDto>> getCourseByShortForm(@PathVariable String shortForm) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Course by short form", courseService.getCourseByShortForm(shortForm)));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(ApiResponse.fail(e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(ApiResponse.fail("Error: " + e.getMessage()));
        }
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

    @DeleteMapping("/design-cards/{cardId}/hard")
    public ResponseEntity<ApiResponse<Void>> hardDeleteCard(@PathVariable Long cardId) {
        courseService.hardDeleteCard(cardId);
        return ResponseEntity.ok(ApiResponse.ok("Card permanently deleted", null));
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

    // ─── SubCourse Cards ─────────────────────────────────

    @GetMapping("/{courseId}/subcourses")
    public ResponseEntity<ApiResponse<List<CourseResponseDto.SubCourseDto>>> getSubCourses(
            @PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.ok("SubCourses",
                courseService.getSubCoursesByCourse(courseId)));
    }

    // Paginated endpoint for better performance
    @GetMapping("/{courseId}/subcourses/paginated")
    public ResponseEntity<ApiResponse<List<CourseResponseDto.SubCourseDto>>> getSubCoursesPaginated(
            @PathVariable Long courseId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.ok("SubCourses",
                courseService.getSubCoursesByCoursePaginated(courseId, page, size)));
    }

    @PostMapping(value = "/{courseId}/subcourses", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CourseResponseDto.SubCourseDto>> addSubCourse(
            @PathVariable Long courseId,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(defaultValue = "admin") String actor,
            @RequestPart(required = false) MultipartFile cardImage) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("SubCourse added",
                courseService.addSubCourse(courseId, title, description, sortOrder, actor, cardImage)));
    }

    @PutMapping(value = "/subcourses/{subCourseId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CourseResponseDto.SubCourseDto>> updateSubCourse(
            @PathVariable Long subCourseId,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(defaultValue = "admin") String actor,
            @RequestPart(required = false) MultipartFile cardImage) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("SubCourse updated",
                courseService.updateSubCourse(subCourseId, title, description, sortOrder, actor, cardImage)));
    }

    @DeleteMapping("/subcourses/{subCourseId}/soft")
    public ResponseEntity<ApiResponse<Void>> softDeleteSubCourse(
            @PathVariable Long subCourseId,
            @RequestParam(defaultValue = "admin") String actor) {
        courseService.softDeleteSubCourse(subCourseId, actor);
        return ResponseEntity.ok(ApiResponse.ok("SubCourse soft-deleted", null));
    }

    // ─── IMAGE ENDPOINTS ─────────────────────────────────────────

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}/image/{type}")
    public ResponseEntity<byte[]> getCourseImage(
            @PathVariable Long id,
            @PathVariable String type) {
        return courseService.getCourseImage(id, type);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/design-cards/{cardId}/image")
    public ResponseEntity<byte[]> getCardImage(@PathVariable Long cardId) {
        return courseService.getCardImage(cardId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/benefits/{benefitId}/image")
    public ResponseEntity<byte[]> getBenefitImage(@PathVariable Long benefitId) {
        return courseService.getBenefitImage(benefitId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/subcourses/{subCourseId}/image")
    public ResponseEntity<byte[]> getSubCourseImage(@PathVariable Long subCourseId) {
        return courseService.getSubCourseImage(subCourseId);
    }
}