package com.HomestayBooking.HomestayBooking.controller;

import com.HomestayBooking.HomestayBooking.dto.LoginRequest;
import com.HomestayBooking.HomestayBooking.dto.RefreshTokenRequest;
import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.entities.User;
import com.HomestayBooking.HomestayBooking.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody User user) {
        Response response = authenticationService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest loginRequest) {
        Response response = authenticationService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<Response> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        Response response = authenticationService.refreshToken(refreshTokenRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
