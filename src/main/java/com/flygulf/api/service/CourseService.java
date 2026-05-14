package com.flygulf.api.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.flygulf.api.dto.CourseLightDto;
import com.flygulf.api.dto.CourseResponseDto;
import com.flygulf.api.model.Course;
import com.flygulf.api.model.CourseBenefit;
import com.flygulf.api.model.CourseContent;
import com.flygulf.api.model.CourseDesignCard;
import com.flygulf.api.model.CourseOverview;
import com.flygulf.api.model.Status;
import com.flygulf.api.model.SubCourse;
import com.flygulf.api.repository.CourseBenefitRepository;
import com.flygulf.api.repository.CourseContentRepository;
import com.flygulf.api.repository.CourseDesignCardRepository;
import com.flygulf.api.repository.CourseOverviewRepository;
import com.flygulf.api.repository.CourseRepository;
import com.flygulf.api.repository.SubCourseRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepo;
    private final CourseOverviewRepository overviewRepo;
    private final CourseDesignCardRepository cardRepo;
    private final CourseContentRepository contentRepo;
    private final CourseBenefitRepository benefitRepo;
    private final SubCourseRepository subCourseRepo;

    @org.springframework.beans.factory.annotation.Value("${app.base-url}")
    private String baseUrl;

    // ══════════════════════════════════════
    // TABLE 1 — Course CRUD
    // ══════════════════════════════════════

    @Transactional
    public CourseResponseDto createCourse(
            String courseName, String shortForm, String shortDesc,
            String aboutTitle, String aboutTotalExperience, String aboutDescription,
            String features, String courseDetailTitle, Integer courseHours,
            String intensive, Integer sortOrder, String createdBy,
            MultipartFile bannerImage, MultipartFile cardImage,
            MultipartFile logo, MultipartFile aboutImage,
            MultipartFile courseDetailImage) throws IOException {

        if (sortOrder != null && courseRepo.existsBySortOrderAndDeletedFalse(sortOrder))
            throw new IllegalArgumentException("Sort order " + sortOrder + " is already taken. Please choose a different number.");

        Course course = Course.builder()
                .courseName(courseName).shortForm(shortForm).shortDesc(shortDesc)
                .aboutTitle(aboutTitle).aboutTotalExperience(aboutTotalExperience)
                .aboutDescription(aboutDescription).features(features)
                .courseDetailTitle(courseDetailTitle).courseHours(courseHours)
                .intensive(intensive).sortOrder(sortOrder).createdBy(createdBy)
                .status(Status.ACTIVE).deleted(false).build();

        if (bannerImage != null && !bannerImage.isEmpty()) {
            course.setBannerImage(bannerImage.getBytes());
            course.setBannerImageType(bannerImage.getContentType());
            course.setBannerImageName(bannerImage.getOriginalFilename());
        }
        if (cardImage != null && !cardImage.isEmpty()) {
            course.setCardImage(cardImage.getBytes());
            course.setCardImageType(cardImage.getContentType());
            course.setCardImageName(cardImage.getOriginalFilename());
        }
        if (logo != null && !logo.isEmpty()) {
            course.setLogo(logo.getBytes());
            course.setLogoType(logo.getContentType());
            course.setLogoName(logo.getOriginalFilename());
        }
        if (aboutImage != null && !aboutImage.isEmpty()) {
            course.setAboutImage(aboutImage.getBytes());
            course.setAboutImageType(aboutImage.getContentType());
            course.setAboutImageName(aboutImage.getOriginalFilename());
        }
        if (courseDetailImage != null && !courseDetailImage.isEmpty()) {
            course.setCourseDetailImage(courseDetailImage.getBytes());
            course.setCourseDetailImageType(courseDetailImage.getContentType());
            course.setCourseDetailImageName(courseDetailImage.getOriginalFilename());
        }
        return toDto(courseRepo.save(course));
    }

    public List<CourseResponseDto> getAllCourses() {
        return courseRepo.findByDeletedFalse().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<CourseLightDto> getActiveCourses() {
        return courseRepo.findAllActiveForFrontend().stream().map(this::toLightDto).collect(Collectors.toList());
    }

    @Transactional
    public CourseResponseDto getCourseById(Long id) {
        Course course = courseRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + id));
        return toDtoFull(course);
    }

    @Transactional
    public CourseResponseDto getCourseByShortForm(String shortForm) {
        Course course = courseRepo.findFirstByShortFormIgnoreCaseAndDeletedFalseOrderByCreatedAtDesc(shortForm)
                .orElseThrow(() -> new NoSuchElementException("Course not found with shortForm: " + shortForm));
        return toDtoFull(course);
    }

    @Transactional
    public CourseResponseDto updateCourse(Long id, String courseName, String shortForm,
            String shortDesc, String aboutTitle, String aboutTotalExperience,
            String aboutDescription, String features, String courseDetailTitle,
            Integer courseHours, String intensive, Integer sortOrder, String updatedBy,
            MultipartFile bannerImage, MultipartFile cardImage,
            MultipartFile logo, MultipartFile aboutImage,
            MultipartFile courseDetailImage) throws IOException {

        Course course = courseRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + id));

        if (sortOrder != null && courseRepo.existsBySortOrderAndDeletedFalseAndIdNot(sortOrder, id))
            throw new IllegalArgumentException("Sort order " + sortOrder + " is already taken. Please choose a different number.");

        if (courseName != null) course.setCourseName(courseName);
        if (shortForm != null) course.setShortForm(shortForm);
        if (shortDesc != null) course.setShortDesc(shortDesc);
        if (aboutTitle != null) course.setAboutTitle(aboutTitle);
        if (aboutTotalExperience != null) course.setAboutTotalExperience(aboutTotalExperience);
        if (aboutDescription != null) course.setAboutDescription(aboutDescription);
        if (features != null) course.setFeatures(features);
        if (courseDetailTitle != null) course.setCourseDetailTitle(courseDetailTitle);
        if (courseHours != null) course.setCourseHours(courseHours);
        if (intensive != null) course.setIntensive(intensive);
        if (sortOrder != null) course.setSortOrder(sortOrder);
        if (updatedBy != null) course.setUpdatedBy(updatedBy);

        if (bannerImage != null && !bannerImage.isEmpty()) {
            course.setBannerImage(bannerImage.getBytes());
            course.setBannerImageType(bannerImage.getContentType());
            course.setBannerImageName(bannerImage.getOriginalFilename());
        }
        if (cardImage != null && !cardImage.isEmpty()) {
            course.setCardImage(cardImage.getBytes());
            course.setCardImageType(cardImage.getContentType());
            course.setCardImageName(cardImage.getOriginalFilename());
        }
        if (logo != null && !logo.isEmpty()) {
            course.setLogo(logo.getBytes());
            course.setLogoType(logo.getContentType());
            course.setLogoName(logo.getOriginalFilename());
        }
        if (aboutImage != null && !aboutImage.isEmpty()) {
            course.setAboutImage(aboutImage.getBytes());
            course.setAboutImageType(aboutImage.getContentType());
            course.setAboutImageName(aboutImage.getOriginalFilename());
        }
        if (courseDetailImage != null && !courseDetailImage.isEmpty()) {
            course.setCourseDetailImage(courseDetailImage.getBytes());
            course.setCourseDetailImageType(courseDetailImage.getContentType());
            course.setCourseDetailImageName(courseDetailImage.getOriginalFilename());
        }
        return toDto(courseRepo.save(course));
    }

    @Transactional
    public CourseResponseDto toggleStatus(Long id, String updatedBy) {
        Course course = courseRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + id));
        course.setStatus(course.getStatus() == Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE);
        course.setUpdatedBy(updatedBy);
        return toDto(courseRepo.save(course));
    }

    @Transactional
    public void softDelete(Long id, String updatedBy) {
        Course course = courseRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + id));
        course.setDeleted(true);
        course.setUpdatedBy(updatedBy);
        courseRepo.save(course);
    }

    @Transactional
    public void hardDelete(Long id) {
        if (!courseRepo.existsById(id))
            throw new NoSuchElementException("Course not found: " + id);
        courseRepo.deleteById(id);
    }

    // ══════════════════════════════════════
    // TABLE 2 — CourseOverview CRUD
    // ══════════════════════════════════════

    @Transactional
    public CourseResponseDto.CourseOverviewDto saveOverview(Long courseId, String title,
            String subTitle, String description, String majorConceptHeading,
            String majorConcepts, String actor) {

        Course course = courseRepo.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + courseId));

        CourseOverview overview = overviewRepo.findByCourseIdAndDeletedFalse(courseId)
                .orElse(CourseOverview.builder().course(course).createdBy(actor).build());

        overview.setTitle(title);
        overview.setSubTitle(subTitle);
        overview.setDescription(description);
        overview.setMajorConceptHeading(majorConceptHeading);
        overview.setMajorConcepts(majorConcepts);
        overview.setUpdatedBy(actor);
        overview.setStatus(Status.ACTIVE);
        overview.setDeleted(false);

        return toOverviewDto(overviewRepo.save(overview));
    }

    @Transactional
    public void softDeleteOverview(Long overviewId, String actor) {
        CourseOverview ov = overviewRepo.findById(overviewId)
                .orElseThrow(() -> new NoSuchElementException("Overview not found"));
        ov.setDeleted(true);
        ov.setUpdatedBy(actor);
        overviewRepo.save(ov);
    }

    // ══════════════════════════════════════
    // TABLE 3 — DesignCard CRUD
    // ══════════════════════════════════════

    @Transactional
    public CourseResponseDto.DesignCardDto addDesignCard(Long courseId,
            String colorBackground, String title, String description,
            Integer sortOrder, String actor, MultipartFile logo) throws IOException {

        Course course = courseRepo.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + courseId));

        CourseDesignCard card = CourseDesignCard.builder()
                .course(course).colorBackground(colorBackground).title(title)
                .description(description).sortOrder(sortOrder != null ? sortOrder : 0)
                .createdBy(actor).status(Status.ACTIVE).deleted(false).build();

        if (logo != null && !logo.isEmpty()) {
            card.setLogo(logo.getBytes());
            card.setLogoType(logo.getContentType());
            card.setLogoName(logo.getOriginalFilename());
        }
        return toCardDto(cardRepo.save(card));
    }

    @Transactional
    public CourseResponseDto.DesignCardDto updateDesignCard(Long cardId,
            String colorBackground, String title, String description,
            Integer sortOrder, String actor, MultipartFile logo) throws IOException {

        CourseDesignCard card = cardRepo.findByIdAndDeletedFalse(cardId)
                .orElseThrow(() -> new NoSuchElementException("Card not found: " + cardId));

        if (colorBackground != null) card.setColorBackground(colorBackground);
        if (title != null) card.setTitle(title);
        if (description != null) card.setDescription(description);
        if (sortOrder != null) card.setSortOrder(sortOrder);
        if (actor != null) card.setUpdatedBy(actor);
        if (logo != null && !logo.isEmpty()) {
            card.setLogo(logo.getBytes());
            card.setLogoType(logo.getContentType());
            card.setLogoName(logo.getOriginalFilename());
        }
        return toCardDto(cardRepo.save(card));
    }

    @Transactional
    public void softDeleteCard(Long cardId, String actor) {
        CourseDesignCard card = cardRepo.findByIdAndDeletedFalse(cardId)
                .orElseThrow(() -> new NoSuchElementException("Card not found"));
        card.setDeleted(true);
        card.setUpdatedBy(actor);
        cardRepo.save(card);
    }

    @Transactional
    public void hardDeleteCard(Long cardId) {
        if (!cardRepo.existsById(cardId))
            throw new NoSuchElementException("Card not found: " + cardId);
        cardRepo.deleteById(cardId);
    }

    public List<CourseResponseDto.DesignCardDto> getCardsByCourse(Long courseId) {
        return cardRepo.findByCourseIdAndDeletedFalseOrderBySortOrderAsc(courseId)
                .stream().map(this::toCardDto).collect(Collectors.toList());
    }

    // ══════════════════════════════════════
    // TABLE 4 — CourseContent CRUD
    // ══════════════════════════════════════

    @Transactional
    public CourseResponseDto.CourseContentDto addContent(Long courseId, String title,
            Integer sortOrder, String actor) {
        Course course = courseRepo.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + courseId));
        CourseContent content = CourseContent.builder()
                .course(course).title(title)
                .sortOrder(sortOrder != null ? sortOrder : 0)
                .createdBy(actor).status(Status.ACTIVE).deleted(false).build();
        return toContentDto(contentRepo.save(content));
    }

    @Transactional
    public CourseResponseDto.CourseContentDto updateContent(Long contentId, String title,
            Integer sortOrder, String actor) {
        CourseContent content = contentRepo.findByIdAndDeletedFalse(contentId)
                .orElseThrow(() -> new NoSuchElementException("Content not found"));
        if (title != null) content.setTitle(title);
        if (sortOrder != null) content.setSortOrder(sortOrder);
        if (actor != null) content.setUpdatedBy(actor);
        return toContentDto(contentRepo.save(content));
    }

    @Transactional
    public void softDeleteContent(Long contentId, String actor) {
        CourseContent content = contentRepo.findByIdAndDeletedFalse(contentId)
                .orElseThrow(() -> new NoSuchElementException("Content not found"));
        content.setDeleted(true);
        content.setUpdatedBy(actor);
        contentRepo.save(content);
    }

    public List<CourseResponseDto.CourseContentDto> getContentsByCourse(Long courseId) {
        return contentRepo.findByCourseIdAndDeletedFalseOrderBySortOrderAsc(courseId)
                .stream().map(this::toContentDto).collect(Collectors.toList());
    }

    // ══════════════════════════════════════
    // TABLE 5 — CourseBenefit CRUD
    // ══════════════════════════════════════

    @Transactional
    public CourseResponseDto.BenefitDto addBenefit(Long courseId, String title,
            String description, Integer sortOrder, String actor,
            MultipartFile logo) throws IOException {
        Course course = courseRepo.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + courseId));
        CourseBenefit benefit = CourseBenefit.builder()
                .course(course).title(title).description(description)
                .sortOrder(sortOrder != null ? sortOrder : 0)
                .createdBy(actor).status(Status.ACTIVE).deleted(false).build();
        if (logo != null && !logo.isEmpty()) {
            benefit.setLogo(logo.getBytes());
            benefit.setLogoType(logo.getContentType());
            benefit.setLogoName(logo.getOriginalFilename());
        }
        return toBenefitDto(benefitRepo.save(benefit));
    }

    @Transactional
    public CourseResponseDto.BenefitDto updateBenefit(Long benefitId, String title,
            String description, Integer sortOrder, String actor,
            MultipartFile logo) throws IOException {
        CourseBenefit benefit = benefitRepo.findByIdAndDeletedFalse(benefitId)
                .orElseThrow(() -> new NoSuchElementException("Benefit not found"));
        if (title != null) benefit.setTitle(title);
        if (description != null) benefit.setDescription(description);
        if (sortOrder != null) benefit.setSortOrder(sortOrder);
        if (actor != null) benefit.setUpdatedBy(actor);
        if (logo != null && !logo.isEmpty()) {
            benefit.setLogo(logo.getBytes());
            benefit.setLogoType(logo.getContentType());
            benefit.setLogoName(logo.getOriginalFilename());
        }
        return toBenefitDto(benefitRepo.save(benefit));
    }

    @Transactional
    public void softDeleteBenefit(Long benefitId, String actor) {
        CourseBenefit benefit = benefitRepo.findByIdAndDeletedFalse(benefitId)
                .orElseThrow(() -> new NoSuchElementException("Benefit not found"));
        benefit.setDeleted(true);
        benefit.setUpdatedBy(actor);
        benefitRepo.save(benefit);
    }

    public List<CourseResponseDto.BenefitDto> getBenefitsByCourse(Long courseId) {
        return benefitRepo.findByCourseIdAndDeletedFalseOrderBySortOrderAsc(courseId)
                .stream().map(this::toBenefitDto).collect(Collectors.toList());
    }

    // ══════════════════════════════════════
    // SubCourse CRUD
    // ══════════════════════════════════════

    @Transactional
    public CourseResponseDto.SubCourseDto addSubCourse(Long courseId, String title,
            String description, Integer sortOrder, String actor,
            MultipartFile cardImage) throws IOException {
        Course course = courseRepo.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + courseId));
        SubCourse subCourse = SubCourse.builder()
                .course(course).title(title).description(description)
                .sortOrder(sortOrder != null ? sortOrder : 0)
                .createdBy(actor).status(Status.ACTIVE).deleted(false).build();
        if (cardImage != null && !cardImage.isEmpty()) {
            subCourse.setCardImage(cardImage.getBytes());
            subCourse.setCardImageType(cardImage.getContentType());
            subCourse.setCardImageName(cardImage.getOriginalFilename());
        }
        return toSubCourseDto(subCourseRepo.save(subCourse));
    }

    @Transactional
    public CourseResponseDto.SubCourseDto updateSubCourse(Long subCourseId, String title,
            String description, Integer sortOrder, String actor,
            MultipartFile cardImage) throws IOException {
        SubCourse subCourse = subCourseRepo.findByIdAndDeletedFalse(subCourseId)
                .orElseThrow(() -> new NoSuchElementException("SubCourse not found"));
        if (title != null) subCourse.setTitle(title);
        if (description != null) subCourse.setDescription(description);
        if (sortOrder != null) subCourse.setSortOrder(sortOrder);
        if (actor != null) subCourse.setUpdatedBy(actor);
        if (cardImage != null && !cardImage.isEmpty()) {
            subCourse.setCardImage(cardImage.getBytes());
            subCourse.setCardImageType(cardImage.getContentType());
            subCourse.setCardImageName(cardImage.getOriginalFilename());
        }
        return toSubCourseDto(subCourseRepo.save(subCourse));
    }

    @Transactional
    public void softDeleteSubCourse(Long subCourseId, String actor) {
        SubCourse subCourse = subCourseRepo.findByIdAndDeletedFalse(subCourseId)
                .orElseThrow(() -> new NoSuchElementException("SubCourse not found"));
        subCourse.setDeleted(true);
        subCourse.setUpdatedBy(actor);
        subCourseRepo.save(subCourse);
    }

    public List<CourseResponseDto.SubCourseDto> getSubCoursesByCourse(Long courseId) {
        return subCourseRepo.findByCourseIdAndDeletedFalseOrderBySortOrderAsc(courseId)
                .stream().map(this::toSubCourseDto).collect(Collectors.toList());
    }

    // ══════════════════════════════════════
    // IMAGE SERVING METHODS
    // ══════════════════════════════════════

    public ResponseEntity<byte[]> getCourseImage(Long id, String type) {
        Course course = courseRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NoSuchElementException("Course not found"));
        
        byte[] imageData = null;
        String contentType = "image/jpeg";
        
        switch (type.toLowerCase()) {
            case "banner":
                imageData = course.getBannerImage();
                contentType = course.getBannerImageType();
                break;
            case "card":
                imageData = course.getCardImage();
                contentType = course.getCardImageType();
                break;
            case "logo":
                imageData = course.getLogo();
                contentType = course.getLogoType();
                break;
            case "about":
                imageData = course.getAboutImage();
                contentType = course.getAboutImageType();
                break;
            case "detail":
                imageData = course.getCourseDetailImage();
                contentType = course.getCourseDetailImageType();
                break;
        }
        
        if (imageData == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok()
                .header("Content-Type", contentType != null ? contentType : "image/jpeg")
                .header("Cache-Control", "public, max-age=31536000")
                .body(imageData);
    }

    public ResponseEntity<byte[]> getCardImage(Long cardId) {
        CourseDesignCard card = cardRepo.findByIdAndDeletedFalse(cardId)
                .orElseThrow(() -> new NoSuchElementException("Card not found"));
        
        if (card.getLogo() == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok()
                .header("Content-Type", card.getLogoType() != null ? card.getLogoType() : "image/jpeg")
                .header("Cache-Control", "public, max-age=31536000")
                .body(card.getLogo());
    }

    public ResponseEntity<byte[]> getBenefitImage(Long benefitId) {
        CourseBenefit benefit = benefitRepo.findByIdAndDeletedFalse(benefitId)
                .orElseThrow(() -> new NoSuchElementException("Benefit not found"));
        
        if (benefit.getLogo() == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok()
                .header("Content-Type", benefit.getLogoType() != null ? benefit.getLogoType() : "image/jpeg")
                .header("Cache-Control", "public, max-age=31536000")
                .body(benefit.getLogo());
    }

    public ResponseEntity<byte[]> getSubCourseImage(Long subCourseId) {
        SubCourse subCourse = subCourseRepo.findByIdAndDeletedFalse(subCourseId)
                .orElseThrow(() -> new NoSuchElementException("SubCourse not found"));
        
        if (subCourse.getCardImage() == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok()
                .header("Content-Type", subCourse.getCardImageType() != null ? subCourse.getCardImageType() : "image/jpeg")
                .header("Cache-Control", "public, max-age=31536000")
                .body(subCourse.getCardImage());
    }

    // Paginated version for better performance
    public List<CourseResponseDto.SubCourseDto> getSubCoursesByCoursePaginated(Long courseId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SubCourse> subCoursePage = subCourseRepo.findByCourseIdAndDeletedFalse(courseId, pageable);
        return subCoursePage.getContent().stream().map(this::toSubCourseDto).collect(Collectors.toList());
    }

    // ══════════════════════════════════════
    // PRIVATE MAPPERS — Entity → DTO
    // ══════════════════════════════════════

    private CourseResponseDto toDto(Course c) {
        String apiPath = baseUrl + "/flygulf/api/flygulf/courses";
        return CourseResponseDto.builder()
                .id(c.getId()).courseName(c.getCourseName()).shortForm(c.getShortForm())
                .shortDesc(c.getShortDesc())
                .sortOrder(c.getSortOrder())
                .bannerImage(c.getBannerImageName() != null ? apiPath + "/" + c.getId() + "/image/banner" : null)
                .bannerImageName(c.getBannerImageName())
                .cardImage(c.getCardImageName() != null ? apiPath + "/" + c.getId() + "/image/card" : null)
                .cardImageName(c.getCardImageName())
                .logo(c.getLogoName() != null ? apiPath + "/" + c.getId() + "/image/logo" : null)
                .logoName(c.getLogoName())
                .aboutTitle(c.getAboutTitle())
                .aboutImage(c.getAboutImageName() != null ? apiPath + "/" + c.getId() + "/image/about" : null)
                .aboutImageName(c.getAboutImageName())
                .aboutTotalExperience(c.getAboutTotalExperience())
                .aboutDescription(c.getAboutDescription())
                .features(parseComma(c.getFeatures()))
                .courseDetailTitle(c.getCourseDetailTitle()).courseHours(c.getCourseHours())
                .intensive(c.getIntensive())
                .courseDetailImage(c.getCourseDetailImageName() != null ? apiPath + "/" + c.getId() + "/image/detail" : null)
                .courseDetailImageName(c.getCourseDetailImageName())
                .status(c.getStatus()).deleted(c.getDeleted())
                .createdAt(c.getCreatedAt()).createdBy(c.getCreatedBy())
                .updatedAt(c.getUpdatedAt()).updatedBy(c.getUpdatedBy())
                .build();
    }

    private CourseResponseDto toDtoFull(Course c) {
        CourseResponseDto dto = toDto(c);
        overviewRepo.findByCourseIdAndDeletedFalse(c.getId())
                .ifPresent(ov -> dto.setOverview(toOverviewDto(ov)));
        dto.setDesignCards(cardRepo.findByCourseIdAndDeletedFalseOrderBySortOrderAsc(c.getId())
                .stream().map(this::toCardDto).collect(Collectors.toList()));
        dto.setContents(contentRepo.findByCourseIdAndDeletedFalseOrderBySortOrderAsc(c.getId())
                .stream().map(this::toContentDto).collect(Collectors.toList()));
        dto.setBenefits(benefitRepo.findByCourseIdAndDeletedFalseOrderBySortOrderAsc(c.getId())
                .stream().map(this::toBenefitDto).collect(Collectors.toList()));
        // Don't load subcourses here - use separate endpoint
        dto.setSubCourses(Collections.emptyList());
        return dto;
    }

    private CourseResponseDto.CourseOverviewDto toOverviewDto(CourseOverview ov) {
        return CourseResponseDto.CourseOverviewDto.builder()
                .id(ov.getId()).title(ov.getTitle()).subTitle(ov.getSubTitle())
                .description(ov.getDescription()).majorConceptHeading(ov.getMajorConceptHeading())
                .majorConcepts(parsePipe(ov.getMajorConcepts())).status(ov.getStatus()).build();
    }

    private CourseResponseDto.DesignCardDto toCardDto(CourseDesignCard card) {
        String apiPath = baseUrl + "/flygulf/api/flygulf/courses";
        return CourseResponseDto.DesignCardDto.builder()
                .id(card.getId())
                .logo(card.getLogoName() != null ? apiPath + "/design-cards/" + card.getId() + "/image" : null)
                .logoName(card.getLogoName())
                .colorBackground(card.getColorBackground()).title(card.getTitle())
                .description(card.getDescription()).sortOrder(card.getSortOrder())
                .status(card.getStatus()).build();
    }

    private CourseResponseDto.CourseContentDto toContentDto(CourseContent ct) {
        return CourseResponseDto.CourseContentDto.builder()
                .id(ct.getId()).title(ct.getTitle())
                .sortOrder(ct.getSortOrder()).status(ct.getStatus()).build();
    }

    private CourseResponseDto.BenefitDto toBenefitDto(CourseBenefit b) {
        String apiPath = baseUrl + "/flygulf/api/flygulf/courses";
        return CourseResponseDto.BenefitDto.builder()
                .id(b.getId())
                .logo(b.getLogoName() != null ? apiPath + "/benefits/" + b.getId() + "/image" : null)
                .logoName(b.getLogoName())
                .title(b.getTitle()).description(b.getDescription())
                .sortOrder(b.getSortOrder()).status(b.getStatus()).build();
    }

    private CourseResponseDto.SubCourseDto toSubCourseDto(SubCourse sc) {
        String apiPath = baseUrl + "/flygulf/api/flygulf/courses";
        return CourseResponseDto.SubCourseDto.builder()
                .id(sc.getId())
                .cardImage(sc.getCardImageName() != null ? apiPath + "/subcourses/" + sc.getId() + "/image" : null)
                .cardImageName(sc.getCardImageName())
                .title(sc.getTitle()).description(sc.getDescription())
                .sortOrder(sc.getSortOrder()).status(sc.getStatus()).build();
    }

    private CourseLightDto toLightDto(Course c) {
        String apiPath = baseUrl + "/flygulf/api/flygulf/courses";
        return CourseLightDto.builder()
                .id(c.getId())
                .courseName(c.getCourseName())
                .shortForm(c.getShortForm())
                .shortDesc(c.getShortDesc())
                .sortOrder(c.getSortOrder())
                .courseHours(c.getCourseHours())
                .intensive(c.getIntensive())
                .cardImageName(c.getCardImageName() != null ? apiPath + "/" + c.getId() + "/image/card" : null)
                .logoName(c.getLogoName() != null ? apiPath + "/" + c.getId() + "/image/logo" : null)
                .build();
    }

    private String toBase64(byte[] data, String type) {
        if (data == null || data.length == 0) return null;
        String mimeType = type != null ? type : "image/jpeg";
        return "data:" + mimeType + ";base64," + Base64.getEncoder().encodeToString(data);
    }

    private List<String> parseComma(String raw) {
        if (raw == null || raw.isBlank()) return Collections.emptyList();
        return Arrays.stream(raw.split(",")).map(String::trim)
                .filter(s -> !s.isEmpty()).collect(Collectors.toList());
    }

    private List<String> parsePipe(String raw) {
        if (raw == null || raw.isBlank()) return Collections.emptyList();
        return Arrays.stream(raw.split("\\|")).map(String::trim)
                .filter(s -> !s.isEmpty()).collect(Collectors.toList());
    }

    private void validateImageSize(MultipartFile file) {
        long maxSize = 1 * 1024 * 1024; // 1MB for better performance
        if (file.getSize() > maxSize) {
            throw new IllegalArgumentException("Image size must not exceed 1MB. Current size: " + (file.getSize() / 1024 / 1024) + "MB. Please compress your image.");
        }
    }
}
