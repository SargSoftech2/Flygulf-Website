package com.flygulf.api.repository;

import com.flygulf.api.model.Course;
import com.flygulf.api.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByDeletedFalse();

    List<Course> findByStatusAndDeletedFalse(Status status);

    Optional<Course> findByIdAndDeletedFalse(Long id);

    Optional<Course> findByShortFormIgnoreCaseAndDeletedFalse(String shortForm);

    Optional<Course> findFirstByShortFormIgnoreCaseAndDeletedFalseOrderByCreatedAtDesc(String shortForm);

    boolean existsByShortFormIgnoreCaseAndDeletedFalse(String shortForm);

    boolean existsBySortOrderAndDeletedFalse(Integer sortOrder);

    boolean existsBySortOrderAndDeletedFalseAndIdNot(Integer sortOrder, Long id);

    @Query("SELECT c FROM Course c WHERE c.deleted = false AND c.status = com.flygulf.api.model.Status.ACTIVE ORDER BY c.sortOrder ASC, c.createdAt DESC")
    List<Course> findAllActiveForFrontend();

    @Query("SELECT c.id, c.courseName, c.shortForm, c.shortDesc, c.aboutTitle, c.aboutTotalExperience, c.courseHours, c.intensive, c.status, c.bannerImageName, c.cardImageName, c.logoName FROM Course c WHERE c.deleted = false AND c.status = com.flygulf.api.model.Status.ACTIVE ORDER BY c.createdAt DESC")
    List<Object[]> findAllActiveForFrontendOptimized();
}