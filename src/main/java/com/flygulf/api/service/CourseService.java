package com.flygulf.api.service;

import com.flygulf.api.dto.CourseResponseDto;
import com.flygulf.api.model.*;
import com.flygulf.api.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepo;
    private final CourseOverviewRepository overviewRepo;
    private final CourseDesignCardRepository cardRepo;
    private final CourseContentRepository contentRepo;
    private final CourseBenefitRepository benefitRepo;

    // ══════════════════════════════════════
    // TABLE 1 — Course CRUD
    // ══════════════════════════════════════

    @Transactional
    public CourseResponseDto createCourse(
            String courseName, String shortForm, String shortDesc,
            String aboutTitle, String aboutTotalExperience, String aboutDescription,
            String features, String courseDetailTitle, Integer courseHours,
            String intensive, String createdBy,
            MultipartFile bannerImage, MultipartFile cardImage,
            MultipartFile logo, MultipartFile aboutImage,
            MultipartFile courseDetailImage) throws IOException {

        Course course = Course.builder()
                .courseName(courseName).shortForm(shortForm).shortDesc(shortDesc)
                .aboutTitle(aboutTitle).aboutTotalExperience(aboutTotalExperience)
                .aboutDescription(aboutDescription).features(features)
                .courseDetailTitle(courseDetailTitle).courseHours(courseHours)
                .intensive(intensive).createdBy(createdBy)
                .status(Status.ACTIVE).deleted(false).build();

        if (bannerImage != null && !bannerImage.isEmpty()) {
            course.setBannerImage(bannerImage.getBytes());
            course.setBannerImageType(bannerImage.getContentType());
        }
        if (cardImage != null && !cardImage.isEmpty()) {
            course.setCardImage(cardImage.getBytes());
            course.setCardImageType(cardImage.getContentType());
        }
        if (logo != null && !logo.isEmpty()) {
            course.setLogo(logo.getBytes());
            course.setLogoType(logo.getContentType());
        }
        if (aboutImage != null && !aboutImage.isEmpty()) {
            course.setAboutImage(aboutImage.getBytes());
            course.setAboutImageType(aboutImage.getContentType());
        }
        if (courseDetailImage != null && !courseDetailImage.isEmpty()) {
            course.setCourseDetailImage(courseDetailImage.getBytes());
            course.setCourseDetailImageType(courseDetailImage.getContentType());
        }
        return toDto(courseRepo.save(course));
    }

    public List<CourseResponseDto> getAllCourses() {
        return courseRepo.findByDeletedFalse().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<CourseResponseDto> getActiveCourses() {
        return courseRepo.findAllActiveForFrontend().stream().map(this::toDto).collect(Collectors.toList());
    }

    public CourseResponseDto getCourseById(Long id) {
        Course course = courseRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + id));
        return toDtoFull(course);
    }

    @Transactional
    public CourseResponseDto updateCourse(Long id, String courseName, String shortForm,
            String shortDesc, String aboutTitle, String aboutTotalExperience,
            String aboutDescription, String features, String courseDetailTitle,
            Integer courseHours, String intensive, String updatedBy,
            MultipartFile bannerImage, MultipartFile cardImage,
            MultipartFile logo, MultipartFile aboutImage,
            MultipartFile courseDetailImage) throws IOException {

        Course course = courseRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NoSuchElementException("Course not found: " + id));

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
        if (updatedBy != null) course.setUpdatedBy(updatedBy);

        if (bannerImage != null && !bannerImage.isEmpty()) {
            course.setBannerImage(bannerImage.getBytes());
            course.setBannerImageType(bannerImage.getContentType());
        }
        if (cardImage != null && !cardImage.isEmpty()) {
            course.setCardImage(cardImage.getBytes());
            course.setCardImageType(cardImage.getContentType());
        }
        if (logo != null && !logo.isEmpty()) {
            course.setLogo(logo.getBytes());
            course.setLogoType(logo.getContentType());
        }
        if (aboutImage != null && !aboutImage.isEmpty()) {
            course.setAboutImage(aboutImage.getBytes());
            course.setAboutImageType(aboutImage.getContentType());
        }
        if (courseDetailImage != null && !courseDetailImage.isEmpty()) {
            course.setCourseDetailImage(courseDetailImage.getBytes());
            course.setCourseDetailImageType(courseDetailImage.getContentType());
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
    // PRIVATE MAPPERS — Entity → DTO
    // ══════════════════════════════════════

    private CourseResponseDto toDto(Course c) {
        return CourseResponseDto.builder()
                .id(c.getId()).courseName(c.getCourseName()).shortForm(c.getShortForm())
                .shortDesc(c.getShortDesc())
                .bannerImage(toBase64(c.getBannerImage(), c.getBannerImageType()))
                .cardImage(toBase64(c.getCardImage(), c.getCardImageType()))
                .logo(toBase64(c.getLogo(), c.getLogoType()))
                .aboutTitle(c.getAboutTitle())
                .aboutImage(toBase64(c.getAboutImage(), c.getAboutImageType()))
                .aboutTotalExperience(c.getAboutTotalExperience())
                .aboutDescription(c.getAboutDescription())
                .features(parseComma(c.getFeatures()))
                .courseDetailTitle(c.getCourseDetailTitle()).courseHours(c.getCourseHours())
                .intensive(c.getIntensive())
                .courseDetailImage(toBase64(c.getCourseDetailImage(), c.getCourseDetailImageType()))
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
        return dto;
    }

    private CourseResponseDto.CourseOverviewDto toOverviewDto(CourseOverview ov) {
        return CourseResponseDto.CourseOverviewDto.builder()
                .id(ov.getId()).title(ov.getTitle()).subTitle(ov.getSubTitle())
                .description(ov.getDescription()).majorConceptHeading(ov.getMajorConceptHeading())
                .majorConcepts(parsePipe(ov.getMajorConcepts())).status(ov.getStatus()).build();
    }

    private CourseResponseDto.DesignCardDto toCardDto(CourseDesignCard card) {
        return CourseResponseDto.DesignCardDto.builder()
                .id(card.getId()).logo(toBase64(card.getLogo(), card.getLogoType()))
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
        return CourseResponseDto.BenefitDto.builder()
                .id(b.getId()).logo(toBase64(b.getLogo(), b.getLogoType()))
                .title(b.getTitle()).description(b.getDescription())
                .sortOrder(b.getSortOrder()).status(b.getStatus()).build();
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
}