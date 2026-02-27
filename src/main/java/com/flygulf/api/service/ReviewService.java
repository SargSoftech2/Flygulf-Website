package com.flygulf.api.service;

import com.flygulf.api.dto.ReviewDTO;
import com.flygulf.api.entity.Review;
import com.flygulf.api.repository.ReviewRepository;
import com.flygulf.api.util.FileCompressionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for Review management with file compression
 */
@Service
@RequiredArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;
    
    /**
     * Retrieves all reviews with optional filters
     * @param search Search term for name, designation, course, or review text
     * @param rating Filter by rating (1-5)
     * @return List of ReviewDTO objects
     */
    public List<ReviewDTO> getAllReviews(String search, Integer rating) {
        List<Review> reviews;
        
        if (search != null && !search.isEmpty() && rating != null) {
            reviews = reviewRepository.searchReviewsByRating(search, rating);
        } else if (search != null && !search.isEmpty()) {
            reviews = reviewRepository.searchReviews(search);
        } else if (rating != null) {
            reviews = reviewRepository.findByRating(rating);
        } else {
            reviews = reviewRepository.findAll();
        }
        
        return reviews.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    /**
     * Retrieves a single review by ID
     * @param id Review ID
     * @return ReviewDTO object
     */
    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        return convertToDTO(review);
    }
    
    /**
     * Creates a new review with file uploads
     * @param name Reviewer name
     * @param mobile Mobile number
     * @param designation Designation
     * @param course Course name
     * @param reviewText Review text
     * @param rating Rating (1-5)
     * @param profilePic Profile picture file
     * @param audio Audio file
     * @param video Video file
     * @return Created ReviewDTO
     */
    @Transactional
    public ReviewDTO createReview(String name, String mobile, String designation, 
                                  String course, String reviewText, Integer rating,
                                  MultipartFile profilePic, MultipartFile audio, 
                                  MultipartFile video) throws IOException {
        Review review = new Review();
        review.setName(name);
        review.setMobile(mobile);
        review.setDesignation(designation);
        review.setCourse(course);
        review.setReview(reviewText);
        review.setRating(rating);
        
        if (profilePic != null && !profilePic.isEmpty()) {
            review.setProfilePic(FileCompressionUtil.compressFile(profilePic.getBytes()));
            review.setProfilePicType(profilePic.getContentType());
        }
        
        if (audio != null && !audio.isEmpty()) {
            review.setAudio(FileCompressionUtil.compressFile(audio.getBytes()));
            review.setAudioType(audio.getContentType());
        }
        
        if (video != null && !video.isEmpty()) {
            review.setVideo(FileCompressionUtil.compressFile(video.getBytes()));
            review.setVideoType(video.getContentType());
        }
        
        Review savedReview = reviewRepository.save(review);
        return convertToDTO(savedReview);
    }
    
    /**
     * Updates an existing review
     * @param id Review ID
     * @param name Reviewer name
     * @param mobile Mobile number
     * @param designation Designation
     * @param course Course name
     * @param reviewText Review text
     * @param rating Rating (1-5)
     * @param profilePic Profile picture file (optional)
     * @param audio Audio file (optional)
     * @param video Video file (optional)
     * @return Updated ReviewDTO
     */
    @Transactional
    public ReviewDTO updateReview(Long id, String name, String mobile, String designation,
                                  String course, String reviewText, Integer rating,
                                  MultipartFile profilePic, MultipartFile audio,
                                  MultipartFile video) throws IOException {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        
        review.setName(name);
        review.setMobile(mobile);
        review.setDesignation(designation);
        review.setCourse(course);
        review.setReview(reviewText);
        review.setRating(rating);
        
        if (profilePic != null && !profilePic.isEmpty()) {
            review.setProfilePic(FileCompressionUtil.compressFile(profilePic.getBytes()));
            review.setProfilePicType(profilePic.getContentType());
        }
        
        if (audio != null && !audio.isEmpty()) {
            review.setAudio(FileCompressionUtil.compressFile(audio.getBytes()));
            review.setAudioType(audio.getContentType());
        }
        
        if (video != null && !video.isEmpty()) {
            review.setVideo(FileCompressionUtil.compressFile(video.getBytes()));
            review.setVideoType(video.getContentType());
        }
        
        Review updatedReview = reviewRepository.save(review);
        return convertToDTO(updatedReview);
    }
    
    /**
     * Deletes a review by ID
     * @param id Review ID
     */
    @Transactional
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review not found with id: " + id);
        }
        reviewRepository.deleteById(id);
    }
    
    /**
     * Retrieves compressed file data for a review
     * @param id Review ID
     * @param fileType Type of file (profilePic, audio, video)
     * @return Decompressed file bytes
     */
    public byte[] getReviewFile(Long id, String fileType) throws Exception {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        
        byte[] compressedData = switch (fileType.toLowerCase()) {
            case "profilepic" -> review.getProfilePic();
            case "audio" -> review.getAudio();
            case "video" -> review.getVideo();
            default -> throw new RuntimeException("Invalid file type: " + fileType);
        };
        
        if (compressedData == null) {
            throw new RuntimeException("File not found for type: " + fileType);
        }
        
        return FileCompressionUtil.decompressFile(compressedData);
    }
    
    /**
     * Gets content type for a specific file
     * @param id Review ID
     * @param fileType Type of file
     * @return Content type string
     */
    public String getFileContentType(Long id, String fileType) {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        
        return switch (fileType.toLowerCase()) {
            case "profilepic" -> review.getProfilePicType();
            case "audio" -> review.getAudioType();
            case "video" -> review.getVideoType();
            default -> throw new RuntimeException("Invalid file type: " + fileType);
        };
    }
    
    /**
     * Converts Review entity to ReviewDTO
     * @param review Review entity
     * @return ReviewDTO object
     */
    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setName(review.getName());
        dto.setMobile(review.getMobile());
        dto.setDesignation(review.getDesignation());
        dto.setCourse(review.getCourse());
        dto.setReview(review.getReview());
        dto.setRating(review.getRating());
        dto.setHasProfilePic(review.getProfilePic() != null);
        dto.setHasAudio(review.getAudio() != null);
        dto.setHasVideo(review.getVideo() != null);
        dto.setProfilePicType(review.getProfilePicType());
        dto.setAudioType(review.getAudioType());
        dto.setVideoType(review.getVideoType());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setUpdatedAt(review.getUpdatedAt());
        return dto;
    }
}
