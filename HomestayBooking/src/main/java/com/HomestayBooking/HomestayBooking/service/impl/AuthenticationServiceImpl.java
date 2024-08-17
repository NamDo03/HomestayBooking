package com.HomestayBooking.HomestayBooking.service.impl;

import com.HomestayBooking.HomestayBooking.dto.LoginRequest;
import com.HomestayBooking.HomestayBooking.dto.RefreshTokenRequest;
import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.dto.UserDTO;
import com.HomestayBooking.HomestayBooking.entities.Role;
import com.HomestayBooking.HomestayBooking.entities.User;
import com.HomestayBooking.HomestayBooking.exception.OurException;
import com.HomestayBooking.HomestayBooking.repository.UserRepository;
import com.HomestayBooking.HomestayBooking.service.AuthenticationService;
import com.HomestayBooking.HomestayBooking.service.JWTService;
import com.HomestayBooking.HomestayBooking.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public Response register(User user) {
        Response response = new Response();
        try {
            if (user.getRole() == null) {
                user.setRole(Role.USER);
            }
            if(userRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + "Already Exists Email");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser =userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception  e) {
            response.setStatusCode(500);
            response.setMessage("Error when register" + e.getMessage());
        }
        return response;
    }

    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new IllegalArgumentException("Invalid email or password."));
            var token =jwtService.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole().name());
            response.setExpirationTime("7 Days");
            response.setMessage("successful");
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error when login" + e.getMessage());
        }
        return response;

    }

    public Response refreshToken(RefreshTokenRequest refreshTokenRequest) {
        Response response = new Response();
        try {
            String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
            User user =userRepository.findByEmail(userEmail).orElseThrow();
            if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
                String newAccessToken = jwtService.generateToken(user);

                response.setStatusCode(200);
                response.setToken(newAccessToken);
                response.setRole(user.getRole().name());
                response.setExpirationTime("7 Days");
                response.setMessage("Token refreshed successfully");
            } else {
                response.setStatusCode(401);
                response.setMessage("Invalid refresh token");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error when refreshing token: " + e.getMessage());
        }
        return response;
    }
}
