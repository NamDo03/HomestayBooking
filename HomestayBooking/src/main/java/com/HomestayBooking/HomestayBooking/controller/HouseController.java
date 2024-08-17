package com.HomestayBooking.HomestayBooking.controller;

import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.entities.User;
import com.HomestayBooking.HomestayBooking.service.HouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/house")
@RequiredArgsConstructor
public class HouseController {
    @Autowired
    private HouseService houseService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Response> addNewHouse(
            @RequestParam(value = "address",required = false)String address,
            @RequestParam(value = "province",required = false)String province,
            @RequestParam(value = "city",required = false)String city,
            @RequestParam(value = "houseName",required = false)String houseName,
            @RequestParam(value = "houseType",required = false)String houseType,
            @RequestParam(value = "category",required = false)String category,
            @RequestParam(value = "housePrice",required = false)Double housePrice,
            @RequestParam(value = "photos", required = false) List<MultipartFile> photos,
            @RequestParam(value = "houseDescription",required = false)String houseDescription,
            @RequestParam(value = "guestCount", required = false) Integer guestCount,
            @RequestParam(value = "bedroomCount", required = false) Integer bedroomCount,
            @RequestParam(value = "bathroomCount", required = false) Integer bathroomCount,
            @RequestParam(value = "amenities", required = false) List<String> amenities,
          @RequestParam(value = "userId") Long userId
    ) {
        if(address == null || address.trim().isEmpty() ||
                province == null || province.trim().isEmpty() ||
                city == null || city.trim().isEmpty() ||
                houseType == null || houseType.trim().isEmpty() ||
                category == null || category.trim().isEmpty() ||
                houseDescription == null || houseDescription.trim().isEmpty() ||
                guestCount == null || guestCount == 0 ||
                bedroomCount == null || bedroomCount == 0 ||
                bathroomCount == null || bathroomCount == 0 ||
                housePrice == null || housePrice == 0.0 ||
                photos == null || photos.isEmpty() ||
                amenities == null || amenities.isEmpty() ||
                userId == null
        ){
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Missing required fields");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = houseService
                .addNewHouse(
                        address, province, city,
                        houseName, houseType, category,
                        housePrice, photos,
                        houseDescription, guestCount, bedroomCount,
                        bathroomCount, amenities, userId
                );
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @GetMapping("/all")
    public ResponseEntity<Response> getAllHouses(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        Response response = houseService.getAllHouses(page, size);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/house-by-id/{houseId}")
    public ResponseEntity<Response> getHouseById(@PathVariable Long houseId) {
        Response response = houseService.getHouseById(houseId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/search-houses")
    public ResponseEntity<Response> searchHouses(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy/MM/dd") LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy/MM/dd") LocalDate checkOutDate,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer guestCount,
            @RequestParam(required = false) Integer bedroomCount,
            @RequestParam(required = false) Integer bathroomCount,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        if (checkInDate == null || checkOutDate == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for checkInDate and checkOutDate");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = houseService.searchHouses(
                checkInDate, checkOutDate, category, guestCount, bedroomCount, bathroomCount, keyword, page, size
        );
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @PutMapping("/update/{houseId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateHouse(
            @PathVariable Long houseId,
            @RequestParam(value = "address",required = false)String address,
            @RequestParam(value = "province",required = false)String province,
            @RequestParam(value = "city",required = false)String city,
            @RequestParam(value = "houseName",required = false)String houseName,
            @RequestParam(value = "houseType",required = false)String houseType,
            @RequestParam(value = "category",required = false)String category,
            @RequestParam(value = "housePrice",required = false)Double housePrice,
            @RequestParam(value = "photos", required = false) List<MultipartFile> photos,
            @RequestParam(value = "houseDescription",required = false)String houseDescription,
            @RequestParam(value = "guestCount", required = false) Integer guestCount,
            @RequestParam(value = "bedroomCount", required = false) Integer bedroomCount,
            @RequestParam(value = "bathroomCount", required = false) Integer bathroomCount,
                @RequestParam(value = "amenities", required = false) List<String> amenities
    ) {
        Response response = houseService
                .updateHouse(
                        houseId, address, province,
                        city, houseName, houseType, category, housePrice,
                        photos, houseDescription, guestCount,
                        bedroomCount, bathroomCount, amenities);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{houseId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteHouse(@PathVariable Long houseId) {
        Response response = houseService.deleteHouse(houseId);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }
    @GetMapping("/getFeatured")
    public ResponseEntity<Response> getFeatured() {
        Response response = houseService.getRandomHouses();
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

    @PostMapping("/{userId}/favorites/{houseId}")
    public ResponseEntity<Response> addFavoriteHouse(@PathVariable Long userId, @PathVariable Long houseId) {
        Response response = houseService.addFavoriteHouse(userId, houseId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{userId}/remove-favorite/{houseId}")
    public ResponseEntity<Response> removeFavoriteHouse(@PathVariable Long userId, @PathVariable Long houseId) {
        Response response = houseService.removeFavoriteHouse(userId, houseId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{userId}/favorites")
    public ResponseEntity<Response> getAllFavoriteHouse(
            @PathVariable Long userId
    ) {
        Response response = houseService.getAllFavoriteHouses(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/isFavorite")
    public Response isHouseFavoritedByUser(@RequestParam Long userId, @RequestParam Long houseId) {
       return houseService.isHouseFavoritedByUser(userId,houseId);
    }
}
