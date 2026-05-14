package com.flygulf.api.repository;

import com.flygulf.api.model.CourseContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CourseContentRepository extends JpaRepository<CourseContent, Long> {
    List<CourseContent> findByCourseIdAndDeletedFalseOrderBySortOrderAsc(Long courseId);
    Optional<CourseContent> findByIdAndDeletedFalse(Long id);
    void deleteByCourseId(Long courseId);
}