package com.HomestayBooking.HomestayBooking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HouseDTO {
    private Long id;

    private String address;
    private String province;
    private String city;

    private String houseName;
    private String houseType;
    private String category;

    private double housePrice;
    private List<String> housePhotoUrls;
    private String houseDescription;

    private int guestCount;
    private int bedroomCount;
    private int bathroomCount;
    private List<String> amenities;
    private Long userId;

    private List<BookingDTO> bookings = new ArrayList<>();
}
