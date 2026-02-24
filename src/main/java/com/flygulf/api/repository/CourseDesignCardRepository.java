package com.flygulf.api.repository;

import com.flygulf.api.model.CourseDesignCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CourseDesignCardRepository extends JpaRepository<CourseDesignCard, Long> {
    List<CourseDesignCard> findByCourseIdAndDeletedFalseOrderBySortOrderAsc(Long courseId);
    Optional<CourseDesignCard> findByIdAndDeletedFalse(Long id);
    void deleteByCourseId(Long courseId);
}