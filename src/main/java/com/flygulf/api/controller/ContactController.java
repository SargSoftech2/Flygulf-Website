// // package com.flygulf.api.controller;

// // import com.flygulf.api.dto.ApiResponse;
// // import com.flygulf.api.model.ContactMessage;
// // import com.flygulf.api.repository.ContactRepository;
// // import com.flygulf.api.security.JwtUtil;
// // import com.flygulf.api.service.EmailService;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.http.HttpStatus;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.web.bind.annotation.*;

// // @RestController
// // @RequestMapping("flygulf/api/contact")
// // @CrossOrigin(origins = "*")
// // public class ContactController {

// //     @Autowired
// //     private ContactRepository contactRepository;
    
// //     @Autowired
// //     private JwtUtil jwtUtil;

// //      @Autowired
// //     private EmailService emailService; 

// //     // @PostMapping("/send")
// //     // public ResponseEntity<?> sendMessage(@RequestBody ContactMessage message) {
// //     //     return ResponseEntity.ok(contactRepository.save(message));
// //     // }

// //     @PostMapping("/send")
// // public ResponseEntity<?> saveContact(@RequestBody Contact contact) {

// //     contactRepository.save(contact);

// //     User user = new User();
// //     user.setFullName(contact.getName());
// //     user.setEmail(contact.getEmail());
// //     user.setPhone("Not Provided");
// //     user.setCourse(contact.getSubject());

// //     emailService.sendRegistrationEmails(user);

// //     return ResponseEntity.ok("Saved and email sent");
// // }
    
// //     @GetMapping("/enquiries")
// //     public ResponseEntity<?> getAllEnquiries(
// //             @RequestHeader(value = "Authorization", required = false) String authHeader) {
// //         try {
// //             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
// //                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
// //                         .body(ApiResponse.fail("Authorization required"));
// //             }
            
// //             String token = authHeader.substring(7);
// //             String username = jwtUtil.extractUsername(token);
            
// //             if (!jwtUtil.validateToken(token, username)) {
// //                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
// //                         .body(ApiResponse.fail("Invalid token"));
// //             }
            
// //             return ResponseEntity.ok(contactRepository.findAll());
// //         } catch (Exception e) {
// //             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
// //                     .body(ApiResponse.fail("Authentication failed: " + e.getMessage()));
// //         }
// //     }
// // }




// package com.flygulf.api.controller;

// import com.flygulf.api.dto.ApiResponse;
// import com.flygulf.api.model.ContactMessage;
// import com.flygulf.api.model.User;
// import com.flygulf.api.repository.ContactRepository;
// import com.flygulf.api.security.JwtUtil;
// import com.flygulf.api.service.EmailService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("flygulf/api/contact")
// @CrossOrigin(origins = "*")
// public class ContactController {

//     @Autowired
//     private ContactRepository contactRepository;

//     @Autowired
//     private JwtUtil jwtUtil;

//     @Autowired
//     private EmailService emailService;   // ✅ ADD THIS

//     // ✅ SAVE + SEND EMAIL
//     @PostMapping("/send")
//     public ResponseEntity<?> saveContact(@RequestBody ContactMessage contact) {

//         // Save contact
//         contactRepository.save(contact);

//         // Prepare user object for email
//         User user = new User();
//         user.setFullName(contact.getName());
//         user.setEmail(contact.getEmail());
//         user.setPhone("Not Provided");
//         user.setCourse(contact.getSubject());
//         user.setPassword("dummy");

//         // Send email
//         emailService.sendRegistrationEmails(user);

//         return ResponseEntity.ok("Saved and email sent");
//     }

//     // 🔐 Protected endpoint
//     @GetMapping("/enquiries")
//     public ResponseEntity<?> getAllEnquiries(
//             @RequestHeader(value = "Authorization", required = false) String authHeader) {
//         try {
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(ApiResponse.fail("Authorization required"));
//             }

//             String token = authHeader.substring(7);
//             String username = jwtUtil.extractUsername(token);

//             if (!jwtUtil.validateToken(token, username)) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(ApiResponse.fail("Invalid token"));
//             }

//             return ResponseEntity.ok(contactRepository.findAll());

//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                     .body(ApiResponse.fail("Authentication failed: " + e.getMessage()));
//         }

        
//     }
// }




package com.flygulf.api.controller;

import com.flygulf.api.dto.ApiResponse;
import com.flygulf.api.model.ContactMessage;
import com.flygulf.api.model.User;
import com.flygulf.api.repository.ContactRepository;
import com.flygulf.api.security.JwtUtil;
import com.flygulf.api.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("flygulf/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    // ✅ SAVE + SEND EMAIL
    @PostMapping("/send")
    public ResponseEntity<?> saveContact(@RequestBody ContactMessage contact) {

        contactRepository.save(contact);

        User user = new User();
        user.setFullName(contact.getName());
        user.setEmail(contact.getEmail());
        user.setPhone("Not Provided");
        user.setCourse(contact.getSubject());
        user.setPassword("dummy");

        emailService.sendRegistrationEmails(user);

        return ResponseEntity.ok("Saved and email sent");
    }

    // 🔐 Get all enquiries
    @GetMapping("/enquiries")
    public ResponseEntity<?> getAllEnquiries(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.fail("Authorization required"));
            }

            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, username)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.fail("Invalid token"));
            }

            return ResponseEntity.ok(contactRepository.findAll());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.fail("Authentication failed: " + e.getMessage()));
        }
    }

    // ✅ Mark enquiry as seen
    @PutMapping("/enquiries/{id}/seen")
    public ResponseEntity<?> markAsSeen(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.fail("Authorization required"));
            }

            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, username)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.fail("Invalid token"));
            }

            ContactMessage contact = contactRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Not found"));

            contact.setNew(false);
            contactRepository.save(contact);

            return ResponseEntity.ok("Marked as seen");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Error: " + e.getMessage()));
        }
    }

    // ✅ Get only new enquiries
    @GetMapping("/enquiries/new")
    public ResponseEntity<?> getNewEnquiries(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.fail("Authorization required"));
            }

            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, username)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.fail("Invalid token"));
            }

            return ResponseEntity.ok(contactRepository.findByIsNewTrue());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.fail("Authentication failed: " + e.getMessage()));
        }
    }
}