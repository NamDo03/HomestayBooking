package com.HomestayBooking.HomestayBooking.service;

import com.HomestayBooking.HomestayBooking.dto.LoginRequest;
import com.HomestayBooking.HomestayBooking.dto.RefreshTokenRequest;
import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.entities.User;

public interface AuthenticationService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response refreshToken(RefreshTokenRequest refreshTokenRequest);
}
