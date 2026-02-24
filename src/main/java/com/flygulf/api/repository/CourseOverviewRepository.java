package com.flygulf.api.repository;

import com.flygulf.api.model.CourseOverview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CourseOverviewRepository extends JpaRepository<CourseOverview, Long> {
    Optional<CourseOverview> findByCourseIdAndDeletedFalse(Long courseId);
    boolean existsByCourseIdAndDeletedFalse(Long courseId);
}