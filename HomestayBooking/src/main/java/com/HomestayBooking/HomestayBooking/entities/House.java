package com.HomestayBooking.HomestayBooking.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "houses")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    private String province;
    private String city;

    private String houseName;
    private String houseType;
    private String category;

    private double housePrice;
    @Column(length = 5000)
    private List<String> housePhotoUrls;
    @Column(length = 5000)
    private String houseDescription;

    private int guestCount;
    private int bedroomCount;
    private int bathroomCount;

    @Column(name = "amenities", length = 5000)
    private List<String> amenities;

    @OneToMany(mappedBy = "house", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany(mappedBy = "favoriteHouses")
    private List<User> favoritedByUsers;
}
