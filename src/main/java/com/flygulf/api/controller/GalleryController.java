package com.flygulf.api.controller;

import com.flygulf.api.model.GalleryItem;
import com.flygulf.api.model.PageContent;
import com.flygulf.api.repository.GalleryItemRepository;
import com.flygulf.api.repository.PageContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "*")
public class GalleryController {

    @Autowired
    private GalleryItemRepository galleryItemRepository;

    @Autowired
    private PageContentRepository pageContentRepository;

    // Gallery Items CRUD
    @GetMapping("/items")
    public List<GalleryItem> getAllItems() {
        return galleryItemRepository.findAll();
    }

    @PostMapping("/items")
    public GalleryItem createItem(@RequestBody GalleryItem item) {
        return galleryItemRepository.save(item);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<GalleryItem> updateItem(@PathVariable Long id, @RequestBody GalleryItem item) {
        if (!galleryItemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        item.setId(id);
        return ResponseEntity.ok(galleryItemRepository.save(item));
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        galleryItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Page Content
    @GetMapping("/content")
    public ResponseEntity<PageContent> getPageContent() {
        List<PageContent> contents = pageContentRepository.findAll();
        if (contents.isEmpty()) {
            PageContent defaultContent = new PageContent();
            defaultContent.setHeroTitle("Gallery");
            defaultContent.setHeroDesc("Every year, hundreds of young, dynamic men and women step into nursing colleges across the nation with a dream.");
            defaultContent.setHeroButtonText("CONTACT NOW");
            defaultContent.setArchiveTitle("Visual Archive");
            defaultContent.setArchiveSub("Our Clinical Excellence");
            defaultContent.setArchiveDesc("Witness the journey of 500+ successful nursing professionals across the globe.");
            defaultContent.setSuccessYears(12);
            defaultContent.setCaptures(25);
            return ResponseEntity.ok(pageContentRepository.save(defaultContent));
        }
        return ResponseEntity.ok(contents.get(0));
    }

    @PutMapping("/content")
    public ResponseEntity<PageContent> updatePageContent(@RequestBody PageContent content) {
        List<PageContent> existing = pageContentRepository.findAll();
        if (!existing.isEmpty()) {
            content.setId(existing.get(0).getId());
        }
        return ResponseEntity.ok(pageContentRepository.save(content));
    }
}
