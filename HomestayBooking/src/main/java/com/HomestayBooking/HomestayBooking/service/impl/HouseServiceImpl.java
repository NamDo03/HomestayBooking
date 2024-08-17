package com.HomestayBooking.HomestayBooking.service.impl;

import com.HomestayBooking.HomestayBooking.dto.HouseDTO;
import com.HomestayBooking.HomestayBooking.dto.Response;
import com.HomestayBooking.HomestayBooking.dto.UserDTO;
import com.HomestayBooking.HomestayBooking.entities.House;
import com.HomestayBooking.HomestayBooking.entities.User;
import com.HomestayBooking.HomestayBooking.exception.OurException;
import com.HomestayBooking.HomestayBooking.repository.HouseRepository;
import com.HomestayBooking.HomestayBooking.repository.UserRepository;
import com.HomestayBooking.HomestayBooking.service.HouseService;
import com.HomestayBooking.HomestayBooking.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.HomestayBooking.HomestayBooking.utils.Utils.mapUserEntityToUserDTO;

@Service
public class HouseServiceImpl implements HouseService {
    @Autowired
    private ImageUploadService  imageUploadService;
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Response addNewHouse(String address, String province, String city,
                                String houseName, String houseType, String category, Double housePrice,
                                List<MultipartFile> images, String houseDescription, Integer guestCount,
                                Integer bedroomCount, Integer bathroomCount, List<String> amenities, Long userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                response.setStatusCode(400);
                response.setMessage("User not found");
                return response;
            }

            List<String> imageUrls = imageUploadService.uploadImages(images);
            House house = new House();

            house.setAddress(address);
            house.setProvince(province);
            house.setCity(city);
            house.setHouseName(houseName);
            house.setHouseType(houseType);
            house.setCategory(category);
            house.setHousePrice(housePrice);
            house.setHousePhotoUrls(imageUrls);
            house.setHouseDescription(houseDescription);
            house.setGuestCount(guestCount);
            house.setBedroomCount(bedroomCount);
            house.setBathroomCount(bathroomCount);
            house.setAmenities(amenities);
            house.setUser(user);

            House savedHouse = houseRepository.save(house);
            HouseDTO houseDTO = Utils.mapHouseEntityToHouseDTO(savedHouse);

            response.setStatusCode(200);
            response.setMessage("successful");
            response.setHouse(houseDTO);
        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error add new house " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllHouses(int page, int size) {
        Response response = new Response();

        try {
            PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "id"));
            Page<House> houseList = houseRepository.findAll(pageRequest);
            List<HouseDTO> houseDTOList = Utils.mapHouseListEntityToHouseListDTO(houseList.getContent());

            response.setStatusCode(200);
            response.setMessage("successful");
            response.setHouseList(houseDTOList);
            response.setTotalPages(houseList.getTotalPages());
            response.setTotalItems(houseList.getTotalElements());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error to get all houses " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteHouse(Long houseId) {
        Response response = new Response();

        try {
            houseRepository.findById(houseId).orElseThrow(() -> new OurException("House Not Found"));
            houseRepository.deleteById(houseId);

            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error delete a house " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateHouse(Long houseId, String address, String province, String city,
                                String houseName, String houseType, String category, Double housePrice,
                                List<MultipartFile> images, String houseDescription, Integer guestCount,
                                Integer bedroomCount, Integer bathroomCount, List<String> amenities) {
        Response response = new Response();

        try {
            List<String> imgsUrlList = null;
            if (images != null && !images.isEmpty()) {
                imgsUrlList = imageUploadService.uploadImages(images);
            }
            House house = houseRepository.findById(houseId).orElseThrow(() -> new OurException("House Not Found"));
            if (address != null && !address.isEmpty()) house.setAddress(address);
            if (province != null && !province.isEmpty()) house.setProvince(province);
            if (city != null && !city.isEmpty()) house.setCity(city);
            if (houseName != null && !houseName.isEmpty()) house.setHouseName(houseName);
            if (houseType != null && !houseType.isEmpty()) house.setHouseType(houseType);
            if (category != null && !category.isEmpty()) house.setCategory(category);
            if(housePrice != null) house.setHousePrice(housePrice);
            if (imgsUrlList != null && !imgsUrlList.isEmpty()) house.setHousePhotoUrls(imgsUrlList);
            if (houseDescription != null && !houseDescription.isEmpty()) house.setHouseDescription(houseDescription);
            if (guestCount != null ) house.setGuestCount(guestCount);
            if (bedroomCount != null )house.setBedroomCount(bedroomCount);
            if(bathroomCount != null) house.setBathroomCount(bathroomCount);
            if (amenities != null && !amenities.isEmpty()) house.setAmenities(amenities);

            House updatedHouse = houseRepository.save(house);
            HouseDTO houseDTO = Utils.mapHouseEntityToHouseDTO(updatedHouse);

            response.setStatusCode(200);
            response.setMessage("successful");
            response.setHouse(houseDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error update a house " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getHouseById(Long houseId) {
        Response response = new Response();

        try {
            House house = houseRepository.findById(houseId).orElseThrow(() -> new OurException("House Not Found"));
            HouseDTO houseDTO = Utils.mapHouseEntityToHouseDTOPlusBookings(house);

            Long userId = houseDTO.getUserId();
            Optional<User> userOptional  = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                UserDTO userDTO = mapUserEntityToUserDTO(userOptional.get());
                response.setStatusCode(200);
                response.setMessage("successful");
                response.setHouse(houseDTO);
                response.setUser(userDTO);
            }else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error get a house by id " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response searchHouses(
            LocalDate checkInDate,
            LocalDate checkOutDate,
            String category,
            Integer guestCount,
            Integer bedroomCount,
            Integer bathroomCount,
            String keyword,
            int page,
            int size
    ) {
        Response response = new Response();
        try {
            if (category != null && category.isEmpty()) {
                category = null;
            }
            PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "id"));
            Page<House> availableHouses = houseRepository
                    .findHousesByDatesAndCategoryAndGuestsAndKeyword(
                            checkInDate,
                            checkOutDate,
                            category,
                            guestCount,
                            bedroomCount,
                            bathroomCount,
                            keyword,
                            pageRequest
                    );
            List<HouseDTO> houseDTOList = Utils.mapHouseListEntityToHouseListDTO(availableHouses.getContent());

            response.setStatusCode(200);
            response.setMessage("successful");
            response.setHouseList(houseDTOList);
            response.setTotalPages(availableHouses.getTotalPages());
            response.setTotalItems(availableHouses.getTotalElements());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error get Available house by options " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getRandomHouses() {
        Response response = new Response();

        try {
            List<House> randomHouses = houseRepository.findAll(
                    PageRequest.of(0, 8, Sort.by(Sort.Direction.DESC, "id"))
            ).getContent();

            // Convert entities to DTOs
            List<HouseDTO> randomHouseDTOs = randomHouses.stream()
                    .map(Utils::mapHouseEntityToHouseDTO)
                    .collect(Collectors.toList());

            response.setStatusCode(200);
            response.setMessage("Successfully retrieved random houses");
            response.setHouseList(randomHouseDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving random houses: " + e.getMessage());
        }

        return response;
    }


    @Override
    public Response addFavoriteHouse(Long userId, Long houseId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            Response response = new Response();
            response.setStatusCode(404);
            response.setMessage("User not found");
            return response;
        }

        House house = houseRepository.findById(houseId).orElse(null);
        if (house == null) {
            Response response = new Response();
            response.setStatusCode(404);
            response.setMessage("House not found");
            return response;
        }

        user.getFavoriteHouses().add(house);
        userRepository.save(user);

        Response response = new Response();
        response.setStatusCode(200);
        response.setMessage("House added to favorites");
        return response;
    }

    @Override
    public Response removeFavoriteHouse(Long userId, Long houseId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            Response response = new Response();
            response.setStatusCode(404);
            response.setMessage("User not found");
            return response;
        }

        House house = houseRepository.findById(houseId).orElse(null);
        if (house == null) {
            Response response = new Response();
            response.setStatusCode(404);
            response.setMessage("House not found");
            return response;
        }

        user.getFavoriteHouses().remove(house);
        userRepository.save(user);

        Response response = new Response();
        response.setStatusCode(200);
        response.setMessage("House removed from favorites");
        return response;
    }

    @Override
    public Response getAllFavoriteHouses(Long userId) {
        Response response = new Response();
        try {
            List<House> favoriteHouses = houseRepository.findFavoriteHousesByUserId(userId);
            List<HouseDTO> houseDTOList = Utils.mapHouseListEntityToHouseListDTO(favoriteHouses);

            response.setStatusCode(200);
            response.setMessage("Success");
            response.setHouseList(houseDTOList);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting favorite houses: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response isHouseFavoritedByUser(Long userId, Long houseId) {
        Response response = new Response();
        try {
            boolean isFavorite = houseRepository.isHouseFavoritedByUser(userId,houseId);
            response.setStatusCode(200);
            response.setMessage("Success");
            response.setFavorited(isFavorite);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error checking if house is favorited: " + e.getMessage());
        }
        return response;
    }


}

