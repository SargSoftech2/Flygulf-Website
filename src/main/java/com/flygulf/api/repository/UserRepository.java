package com.flygulf.api.repository;

import com.flygulf.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // This method allows us to check if an email already exists in the DB
    Optional<User> findByEmail(String email);
}