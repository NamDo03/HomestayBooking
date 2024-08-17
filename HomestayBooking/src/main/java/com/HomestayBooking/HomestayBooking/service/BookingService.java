package com.HomestayBooking.HomestayBooking.service;

import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.entities.Booking;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    Response saveBooking(Long houseId, Long userId, Booking bookingRequest);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

    Response getBookingsByUserId(Long userId);

    List<LocalDate> getBookedDatesByHouseId(Long houseId);
}
