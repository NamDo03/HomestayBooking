package com.HomestayBooking.HomestayBooking.service.impl;

import com.HomestayBooking.HomestayBooking.dto.HouseDTO;
import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.dto.UserDTO;
import com.HomestayBooking.HomestayBooking.entities.House;
import com.HomestayBooking.HomestayBooking.entities.Role;
import com.HomestayBooking.HomestayBooking.entities.User;
import com.HomestayBooking.HomestayBooking.exception.OurException;
import com.HomestayBooking.HomestayBooking.repository.HouseRepository;
import com.HomestayBooking.HomestayBooking.repository.UserRepository;
import com.HomestayBooking.HomestayBooking.service.UserService;
import com.HomestayBooking.HomestayBooking.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HouseRepository houseRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found")) ;
            }
        };
    }

    @Override
    public Response getAllUsers(int page, int size) {
        Response response = new Response();
        try {
            PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "id"));
            Page<User> userList = userRepository.findAll(pageRequest);
            List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList.getContent());

            response.setStatusCode(200);
            response.setMessage("success");
            response.setUserList(userDTOList);
            response.setTotalPages(userList.getTotalPages());
            response.setTotalItems(userList.getTotalElements());

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {
        Response response = new Response();

        try {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setUser(userDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response changeUserRole(Long userId, String newRole) {
        Response response = new Response();
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new OurException("User not found"));

            user.setRole(Role.valueOf(newRole.toUpperCase()));
            userRepository.save(user);

            response.setStatusCode(200);
            response.setMessage("User role updated successfully");
        }  catch (IllegalArgumentException e) {
            response.setStatusCode(400);
            response.setMessage("Invalid role: " + newRole);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating user role: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserProperties(Long userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new OurException("User not found"));

            List<House> houseList = user.getHouses();
            List<HouseDTO> houseDTOList = Utils.mapHouseListEntityToHouseListDTO(houseList);
            response.setStatusCode(200);
            response.setMessage("Success");
            response.setHouseList(houseDTOList);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user houses: " + e.getMessage());
        }
        return response;
    }
}
