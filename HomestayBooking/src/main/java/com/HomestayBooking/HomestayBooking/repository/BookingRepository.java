package com.HomestayBooking.HomestayBooking.repository;

import com.HomestayBooking.HomestayBooking.entities.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findByHouseId(Long houseId);

    @Query("SELECT b FROM Booking b WHERE b.user.email = :email")
    List<Booking> findBookingsByEmail(String email);

    List<Booking> findByUserId(Long userId);
}
