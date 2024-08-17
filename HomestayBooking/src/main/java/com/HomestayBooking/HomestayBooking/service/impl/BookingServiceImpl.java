package com.HomestayBooking.HomestayBooking.service.impl;

import com.HomestayBooking.HomestayBooking.dto.BookingDTO;
import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.entities.Booking;
import com.HomestayBooking.HomestayBooking.entities.House;
import com.HomestayBooking.HomestayBooking.entities.User;
import com.HomestayBooking.HomestayBooking.exception.OurException;
import com.HomestayBooking.HomestayBooking.repository.BookingRepository;
import com.HomestayBooking.HomestayBooking.repository.HouseRepository;
import com.HomestayBooking.HomestayBooking.repository.UserRepository;
import com.HomestayBooking.HomestayBooking.service.BookingService;
import com.HomestayBooking.HomestayBooking.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Response saveBooking(Long houseId, Long userId, Booking bookingRequest) {
        Response response = new Response();

        try {
            if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
                throw new IllegalArgumentException("Check in date must come after check out date");
            }
            House house = houseRepository.findById(houseId).orElseThrow(() -> new OurException("House Not Found"));
            User user = userRepository.findById(userId).orElseThrow(() -> new OurException("User Not Found"));

            List<Booking> existingBookings = house.getBookings();

            if (!houseIsAvailable(bookingRequest, existingBookings)) {
                throw new OurException("House not Available for selected date range");
            }

            bookingRequest.setHouse(house);
            bookingRequest.setUser(user);
            bookingRepository.save(bookingRequest);

            response.setStatusCode(200);
            response.setMessage("successful");
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Saving a booking: " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response getAllBookings() {
        Response response = new Response();

        try {
            List<Booking> bookingList = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingListDTO(bookingList, true, true);

            response.setStatusCode(200);
            response.setMessage("successful");
            response.setBookingList(bookingDTOList);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting all bookings: " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId) {
        Response response = new Response();

        try {
            bookingRepository.findById(bookingId).orElseThrow(() -> new OurException("Booking Does Not Exist"));
            bookingRepository.deleteById(bookingId);

            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Cancelling a booking: " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response getBookingsByUserId(Long userId) {
        Response response = new Response();

        try {
            List<Booking> bookingList = bookingRepository.findByUserId(userId);
            List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingListDTO(bookingList,false,true);

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setBookingList(bookingDTOList);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user bookings: " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<LocalDate> getBookedDatesByHouseId(Long houseId) {
        List<Booking> bookings = bookingRepository.findByHouseId(houseId);
        List<LocalDate> bookedDates = new ArrayList<>();

        for (Booking booking : bookings) {
            LocalDate start = booking.getCheckInDate();
            LocalDate end = booking.getCheckOutDate();
            while (!start.isAfter(end)) {
                bookedDates.add(start);
                start = start.plusDays(1);
            }
        }

        return bookedDates;
    }

    private boolean houseIsAvailable(Booking bookingRequest, List<Booking> existingBookings) {
        return existingBookings.stream().noneMatch(existingBooking ->
                bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) &&
                        bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())
        );
    }


}
