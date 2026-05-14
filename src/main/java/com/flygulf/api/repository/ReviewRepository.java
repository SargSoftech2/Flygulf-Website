package com.flygulf.api.repository;

import com.flygulf.api.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository for Review entity with custom search queries
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    /**
     * Finds reviews by rating
     */
    List<Review> findByRating(Integer rating);
    
    /**
     * Searches reviews by name, designation, course, or review text
     */
    @Query("SELECT r FROM Review r WHERE " +
           "LOWER(r.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.designation) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.course) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.review) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Review> searchReviews(@Param("search") String search);
    
    /**
     * Searches reviews with rating filter
     */
    @Query("SELECT r FROM Review r WHERE r.rating = :rating AND (" +
           "LOWER(r.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.designation) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.course) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.review) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Review> searchReviewsByRating(@Param("search") String search, @Param("rating") Integer rating);
}
