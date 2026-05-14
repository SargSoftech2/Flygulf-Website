// package com.flygulf.api.controller;

// import com.flygulf.api.model.Center;
// import com.flygulf.api.repository.CenterRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("flygulf/api/centers")
// @CrossOrigin(origins = "*")
// public class CenterController {

//     @Autowired
//     private CenterRepository centerRepository;

//     // ✅ Add Center
//     @PostMapping
//     public ResponseEntity<?> addCenter(@RequestBody Center center) {
//         return ResponseEntity.ok(centerRepository.save(center));
//     }

//     // ✅ Get All Centers
//     @GetMapping
//     public List<Center> getAllCenters() {
//         return centerRepository.findAll();
//     }

//     // ✅ Update Center
//     // @PutMapping("/{id}")
//     // public ResponseEntity<?> updateCenter(@PathVariable Long id, @RequestBody Center updatedCenter) {
//     //     Center center = centerRepository.findById(id)
//     //             .orElseThrow(() -> new RuntimeException("Center not found"));

//     //     center.setCity(updatedCenter.getCity());
//     //     center.setAddress(updatedCenter.getAddress());
//     //     center.setDescription(updatedCenter.getDescription());

//     //     return ResponseEntity.ok(centerRepository.save(center));
//     // }
// @PutMapping("/{id}")
// public ResponseEntity<?> updateCenter(@PathVariable Long id, @RequestBody Center updatedCenter) {

//     Center center = centerRepository.findById(id)
//             .orElseThrow(() -> new RuntimeException("Center not found"));

//     center.setCity(updatedCenter.getCity());
//     center.setAddress(updatedCenter.getAddress());
//     center.setDescription(updatedCenter.getDescription());
//     center.setHeadOffice(updatedCenter.getHeadOffice()); // ✅ CORRECT

//     return ResponseEntity.ok(centerRepository.save(center));
// }

//     // ✅ Delete Center
//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> deleteCenter(@PathVariable Long id) {
//         centerRepository.deleteById(id);
//         return ResponseEntity.ok("Deleted successfully");
//     }
// }



package com.flygulf.api.controller;

import com.flygulf.api.model.Center;
import com.flygulf.api.repository.CenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flygulf/api/centers")
@CrossOrigin(origins = "*")
public class CenterController {

    @Autowired
    private CenterRepository centerRepository;

    // ── GET all centers (public) ──────────────────────────────
    @GetMapping
    public ResponseEntity<List<Center>> getAllCenters() {
        return ResponseEntity.ok(centerRepository.findAll());
    }

    // ── POST create center ────────────────────────────────────
    @PostMapping
    public ResponseEntity<?> addCenter(@RequestBody Center center) {
        try {
            if (center.getHeadOffice() == null) center.setHeadOffice(false);
            return ResponseEntity.ok(centerRepository.save(center));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating center: " + e.getMessage());
        }
    }

    // ── PUT update center ─────────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCenter(
            @PathVariable Long id,
            @RequestBody Center updatedCenter) {
        try {
            Center center = centerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Center not found with id: " + id));

            center.setCity(updatedCenter.getCity());
            center.setAddress(updatedCenter.getAddress());
            center.setDescription(updatedCenter.getDescription());
            center.setHeadOffice(
                updatedCenter.getHeadOffice() != null ? updatedCenter.getHeadOffice() : false
            );

            return ResponseEntity.ok(centerRepository.save(center));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating center: " + e.getMessage());
        }
    }

    // ── DELETE center ─────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCenter(@PathVariable Long id) {
        try {
            if (!centerRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Center not found with id: " + id);
            }
            centerRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting center: " + e.getMessage());
        }
    }
}