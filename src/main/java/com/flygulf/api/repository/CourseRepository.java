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

    boolean existsByShortFormIgnoreCaseAndDeletedFalse(String shortForm);

    @Query("SELECT c FROM Course c WHERE c.deleted = false AND c.status = com.flygulf.api.model.Status.ACTIVE ORDER BY c.createdAt DESC")
    List<Course> findAllActiveForFrontend();
}