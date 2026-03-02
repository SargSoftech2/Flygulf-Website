package com.flygulf.api.repository;
import java.util.List;
import com.flygulf.api.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
     List<ContactMessage> findByIsNewTrue(); // ✅ fetch only new ones
}