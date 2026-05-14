package com.flygulf.api.controller;

import com.flygulf.api.dto.ApiResponse;
import com.flygulf.api.dto.ReviewDTO;
import com.flygulf.api.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

/**
 * REST Controller for Review management endpoints
 */
@RestController
@RequestMapping("/flygulf/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class ReviewController {

    private final ReviewService reviewService;

    /**
     * GET /api/reviews - Retrieves all reviews with optional filters
     * 
     * @param search Search term (optional)
     * @param rating Rating filter (optional)
     * @return List of reviews
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<ReviewDTO>>> getAllReviews(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer rating) {
        List<ReviewDTO> reviews = reviewService.getAllReviews(search, rating);
        return ResponseEntity.ok(ApiResponse.ok("Reviews retrieved successfully", reviews));
    }

    /**
     * GET /api/reviews/{id} - Retrieves a single review by ID
     * 
     * @param id Review ID
     * @return Review details
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ReviewDTO>> getReviewById(@PathVariable Long id) {
        ReviewDTO review = reviewService.getReviewById(id);
        return ResponseEntity.ok(ApiResponse.ok("Review retrieved successfully", review));
    }

    /**
     * POST /api/reviews - Creates a new review with file uploads
     * 
     * @param name        Reviewer name
     * @param mobile      Mobile number
     * @param designation Designation
     * @param course      Course name
     * @param review      Review text
     * @param rating      Rating (1-5)
     * @param profilePic  Profile picture file
     * @param audio       Audio file
     * @param video       Video file
     * @return Created review
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ReviewDTO>> createReview(
            @RequestParam String name,
            @RequestParam String mobile,
            @RequestParam(required = false) String designation,
            @RequestParam(required = false) String course,
            @RequestParam String review,
            @RequestParam Integer rating,
            @RequestParam(required = false) MultipartFile profilePic,
            @RequestParam(required = false) MultipartFile audio,
            @RequestParam(required = false) MultipartFile video) {
        try {
            ReviewDTO createdReview = reviewService.createReview(
                    name, mobile, designation, course, review, rating,
                    profilePic, audio, video);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.ok("Review created successfully", createdReview));
        } catch (Exception e) {
            throw new RuntimeException("Failed to create review: " + e.getMessage());
        }
    }

    /**
     * PUT /api/reviews/{id} - Updates an existing review
     * 
     * @param id          Review ID
     * @param name        Reviewer name
     * @param mobile      Mobile number
     * @param designation Designation
     * @param course      Course name
     * @param review      Review text
     * @param rating      Rating (1-5)
     * @param profilePic  Profile picture file (optional)
     * @param audio       Audio file (optional)
     * @param video       Video file (optional)
     * @return Updated review
     */
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ReviewDTO>> updateReview(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String mobile,
            @RequestParam(required = false) String designation,
            @RequestParam(required = false) String course,
            @RequestParam String review,
            @RequestParam Integer rating,
            @RequestParam(required = false) MultipartFile profilePic,
            @RequestParam(required = false) MultipartFile audio,
            @RequestParam(required = false) MultipartFile video) {
        try {
            ReviewDTO updatedReview = reviewService.updateReview(
                    id, name, mobile, designation, course, review, rating,
                    profilePic, audio, video);
            return ResponseEntity.ok(ApiResponse.ok("Review updated successfully", updatedReview));
        } catch (Exception e) {
            throw new RuntimeException("Failed to update review: " + e.getMessage());
        }
    }

    /**
     * DELETE /api/reviews/{id} - Deletes a review
     * 
     * @param id Review ID
     * @return Success message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(ApiResponse.ok("Review deleted successfully", null));
    }

    /**
     * GET /api/reviews/{id}/file/{fileType} - Downloads a file from review
     * 
     * @param id       Review ID
     * @param fileType File type (profilePic, audio, video)
     * @return File bytes
     */
    @GetMapping("/{id}/file/{fileType}")
    public ResponseEntity<byte[]> downloadFile(
            @PathVariable Long id,
            @PathVariable String fileType) {
        try {
            byte[] fileData = reviewService.getReviewFile(id, fileType);
            String contentType = reviewService.getFileContentType(id, fileType);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setCacheControl("no-cache, no-store, must-revalidate");
            headers.setPragma("no-cache");
            headers.setExpires(0);

            return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("Failed to download file: " + e.getMessage());
        }
    }
}
