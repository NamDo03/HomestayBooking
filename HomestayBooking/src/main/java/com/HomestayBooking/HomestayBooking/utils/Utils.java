package com.HomestayBooking.HomestayBooking.utils;

import com.HomestayBooking.HomestayBooking.dto.BookingDTO;
import com.HomestayBooking.HomestayBooking.dto.HouseDTO;
import com.HomestayBooking.HomestayBooking.dto.UserDTO;
import com.HomestayBooking.HomestayBooking.entities.Booking;
import com.HomestayBooking.HomestayBooking.entities.House;
import com.HomestayBooking.HomestayBooking.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole().name());
        return userDTO;
    }

    public static HouseDTO mapHouseEntityToHouseDTO(House house) {
        HouseDTO houseDTO = new HouseDTO();

        houseDTO.setId(house.getId());
        houseDTO.setAddress(house.getAddress());
        houseDTO.setProvince(house.getProvince());
        houseDTO.setCity(house.getCity());
        houseDTO.setHouseName(house.getHouseName());
        houseDTO.setHouseType(house.getHouseType());
        houseDTO.setCategory(house.getCategory());
        houseDTO.setHousePrice(house.getHousePrice());
        houseDTO.setHousePhotoUrls(house.getHousePhotoUrls());
        houseDTO.setHouseDescription(house.getHouseDescription());
        houseDTO.setGuestCount(house.getGuestCount());
        houseDTO.setBedroomCount(house.getBedroomCount());
        houseDTO.setBathroomCount(house.getBathroomCount());
        houseDTO.setAmenities(house.getAmenities());
        houseDTO.setUserId(house.getUser().getId());
        return houseDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        return bookingDTO;
    }

    public static HouseDTO mapHouseEntityToHouseDTOPlusBookings(House house) {
        HouseDTO houseDTO = mapHouseEntityToHouseDTO(house);

        if (house.getBookings() != null) {
            houseDTO.setBookings(house.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }
        return houseDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedHouses(Booking booking, boolean mapUser, boolean mapHouse) {

        BookingDTO bookingDTO = new BookingDTO();
        // Map simple fields
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        if (mapUser) {
            bookingDTO.setUser(Utils.mapUserEntityToUserDTO(booking.getUser()));
        }
        if (mapHouse) {
            bookingDTO.setHouse(mapHouseEntityToHouseDTO(booking.getHouse()));
        }
        return bookingDTO;
    }

    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndHouse(User user) {
        UserDTO userDTO = mapUserEntityToUserDTO(user);

        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingEntityToBookingDTOPlusBookedHouses(booking, false,false)).collect(Collectors.toList()));
        }
        return userDTO;
    }


    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<HouseDTO> mapHouseListEntityToHouseListDTO(List<House> houseList) {
        return houseList.stream().map(Utils::mapHouseEntityToHouseDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList, boolean mapUser, boolean mapHouse) {
        return bookingList.stream()
                .map(booking -> mapBookingEntityToBookingDTOPlusBookedHouses(booking, mapUser, mapHouse))
                .collect(Collectors.toList());
    }
}
