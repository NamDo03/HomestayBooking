package com.HomestayBooking.HomestayBooking.repository;

import com.HomestayBooking.HomestayBooking.entities.House;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    @Query("SELECT h FROM House h WHERE h.id NOT IN (SELECT b.house.id FROM Booking b)")
    Page<House> getAllAvailableHouses(Pageable pageable);

    @Query("SELECT h FROM House h WHERE (:keyword is null " +
            "or h.province LIKE %:keyword% or h.city LIKE %:keyword%) " +
            "and (:category is null or h.category = :category) " +
            "and h.guestCount >= :guestCount " +
            "and h.bedroomCount >= :bedroomCount " +
            "and h.bathroomCount >= :bathroomCount " +
            "and h.id NOT IN " +
            "(SELECT bk.house.id FROM Booking bk WHERE " +
            "(bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))")
    Page<House> findHousesByDatesAndCategoryAndGuestsAndKeyword(
            LocalDate checkInDate,
            LocalDate checkOutDate,
            String category,
            int guestCount,
            int bedroomCount,
            int bathroomCount,
            String keyword,
            Pageable pageable
    );

    @Query("SELECT u.favoriteHouses FROM User u WHERE u.id = :userId")
    List<House> findFavoriteHousesByUserId(Long userId);

    @Query("SELECT CASE WHEN COUNT(h) > 0 THEN TRUE ELSE FALSE END " +
            "FROM User u JOIN u.favoriteHouses h " +
            "WHERE u.id = :userId AND h.id = :houseId")
    boolean isHouseFavoritedByUser(Long userId,Long houseId);
}
