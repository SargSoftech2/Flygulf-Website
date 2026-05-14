package com.flygulf.api.repository;

import com.flygulf.api.model.CourseBenefit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CourseBenefitRepository extends JpaRepository<CourseBenefit, Long> {
    List<CourseBenefit> findByCourseIdAndDeletedFalseOrderBySortOrderAsc(Long courseId);
    Optional<CourseBenefit> findByIdAndDeletedFalse(Long id);
    void deleteByCourseId(Long courseId);
}