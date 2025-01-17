package com.HomestayBooking.HomestayBooking.repository;

import com.HomestayBooking.HomestayBooking.entities.House;
import com.HomestayBooking.HomestayBooking.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

}
