package com.HomestayBooking.HomestayBooking.service;

import com.HomestayBooking.HomestayBooking.dto.Response;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailsService();

    Response getAllUsers(int page, int size);

    Response getMyInfo(String email);
    Response changeUserRole(Long userId, String newRole);

    Response getUserProperties(Long userId);


}
