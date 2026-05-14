package com.flygulf.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.flygulf.api.model.SubCourse;

@Repository
public interface SubCourseRepository extends JpaRepository<SubCourse, Long> {
    List<SubCourse> findByCourseIdAndDeletedFalseOrderBySortOrderAsc(Long courseId);
    Optional<SubCourse> findByIdAndDeletedFalse(Long id);
    
    // Paginated version for better performance
    Page<SubCourse> findByCourseIdAndDeletedFalse(Long courseId, Pageable pageable);
    
    // Optimized query without fetching large image data
    @Query("SELECT sc FROM SubCourse sc WHERE sc.course.id = :courseId AND sc.deleted = false ORDER BY sc.sortOrder ASC")
    List<SubCourse> findByCourseIdAndDeletedFalseOptimized(Long courseId);
}
