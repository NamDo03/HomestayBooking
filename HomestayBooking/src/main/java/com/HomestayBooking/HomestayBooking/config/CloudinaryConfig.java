package com.HomestayBooking.HomestayBooking.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = ObjectUtils.asMap(
                "cloud_name", "decj4171q",
                "api_key", "198346412196619",
                "api_secret", "Qxoux1DYpr_55mA5GpIelmSqdf0"
        );
        return new Cloudinary(config);
    }
}
