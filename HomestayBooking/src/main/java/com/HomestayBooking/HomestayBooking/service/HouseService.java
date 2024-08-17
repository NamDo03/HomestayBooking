package com.HomestayBooking.HomestayBooking.service;

import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface HouseService {
    Response addNewHouse(String address, String province, String city,
                         String houseName, String houseType, String category, Double housePrice,
                         List<MultipartFile> images, String houseDescription, Integer guestCount,
                         Integer bedroomCount, Integer bathroomCount, List<String> amenities, Long userId
                         );
    Response getAllHouses(int page, int size);
    Response deleteHouse(Long houseId);
    Response updateHouse(Long houseId, String address, String province, String city,
                         String houseName, String houseType, String category, Double housePrice,
                         List<MultipartFile> images, String houseDescription, Integer guestCount,
                         Integer bedroomCount, Integer bathroomCount, List<String> amenities);
    Response getHouseById(Long houseId);

    Response searchHouses(
            LocalDate checkInDate,
            LocalDate checkOutDate,
            String category,
            Integer guestCount,
            Integer bedroomCount,
            Integer bathroomCount,
            String keyword,
            int page,
            int size
    );

    Response getRandomHouses();


    Response addFavoriteHouse(Long userId, Long houseId);

    Response removeFavoriteHouse(Long userId, Long houseId);

    Response getAllFavoriteHouses(Long userId);

    Response isHouseFavoritedByUser(Long userId, Long houseId);
}
