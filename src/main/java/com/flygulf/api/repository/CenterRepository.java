// package com.flygulf.api.repository;

// import com.flygulf.api.model.Center;
// import org.springframework.data.jpa.repository.JpaRepository;

// public interface CenterRepository extends JpaRepository<Center, Long> {
// }




package com.flygulf.api.repository;

import com.flygulf.api.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<Center, Long> {
}