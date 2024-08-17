package com.HomestayBooking.HomestayBooking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int statusCode;
    private String message;

    private String token;
    private String role;
    private String expirationTime;
    private long totalItems;
    private int totalPages;

    private boolean isFavorited;

    private UserDTO user;
    private HouseDTO house;
    private BookingDTO booking;
    private List<UserDTO> userList;
    private List<HouseDTO> houseList;
    private List<BookingDTO> bookingList;
}
