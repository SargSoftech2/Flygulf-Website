package com.flygulf.api.repository;

import com.flygulf.api.model.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryItemRepository extends JpaRepository<GalleryItem, Long> {
}
