import axios from "axios";
import { BookHouse, LoginData, RegisterData } from "../config/type";
const BASE_URL = "http://localhost:8080/api";

const parseExpirationTime = (expirationTime: string): number => {
  const [amount, unit] = expirationTime.split(" ");
  switch (unit.toLowerCase()) {
    case "days":
      return parseInt(amount, 10) * 24 * 60 * 60 * 1000;
    case "hours":
      return parseInt(amount, 10) * 60 * 60 * 1000;
    case "minutes":
      return parseInt(amount, 10) * 60 * 1000;
    case "seconds":
      return parseInt(amount, 10) * 1000;
    default:
      return 0;
  }
};

const isTokenExpiringSoon = () => {
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!tokenExpiration) {
    return true;
  }
  const expirationDate = new Date(tokenExpiration);
  const currentTime = new Date();
  const timeUntilExpiration = expirationDate.getTime() - currentTime.getTime();
  return timeUntilExpiration <= 30 * 60 * 1000; // 30 minutes in milliseconds
};

export const getHeader = async () => {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// AUTHENTICATION
const refreshToken = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      token,
    });
    const expirationDate = new Date(
      new Date().getTime() + parseExpirationTime(response.data.expirationTime)
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("tokenExpiration", expirationDate.toString());
    console.log("Token refreshed successfully");
    return response.data.token;
  } catch (error) {
    logout();
    throw new Error("Failed to refresh token");
  }
};

const getToken = async () => {
  if (isTokenExpiringSoon()) {
    return await refreshToken();
  }
  return localStorage.getItem("token");
};

export const loginAcc = async (data: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    const expirationDate = new Date(
      new Date().getTime() + parseExpirationTime(response.data.expirationTime)
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("tokenExpiration", expirationDate.toString());

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const registerAcc = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Register failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isAdmin = () => {
  const role = localStorage.getItem("role");
  return role === "ADMIN";
};

export const isUser = () => {
  const role = localStorage.getItem("role");
  return role === "USER";
};

// USER
export const getAllUsers = async (page: number, size: number) => {
  try {
    const headers = await getHeader();
    const response = await axios.get(`${BASE_URL}/user/all`, {
      headers: headers,
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const headers = await getHeader();
    const response = await axios.get(
      `${BASE_URL}/user/get-logged-in-profile-info`,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const getUserProperties = async (userId: string | number) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}/houses`);
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const changeUserRole = async (
  userId: string | number,
  newRole: string
) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/${userId}/role`, {
      params: newRole,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

// HOUSES
export const addHouse = async (formData: FormData) => {
  try {
    const headers = await getHeader();
    const response = await axios.post(`${BASE_URL}/house/add`, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const searchHouse = async (
  checkInDate: string,
  checkOutDate: string,
  category: string,
  guestCount: string,
  bedroomCount: string,
  bathroomCount: string,
  keyword: string,
  page: number,
  size: number
) => {
  try {
    const response = await axios.get(`${BASE_URL}/house/search-houses`, {
      params: {
        checkInDate,
        checkOutDate,
        category,
        guestCount,
        bedroomCount,
        bathroomCount,
        keyword,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const getAllHouses = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/house/all`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const getFeaturedHouse = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/house/getFeatured`);
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const getHouseById = async (houseId: number | string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/house/house-by-id/${houseId}`
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const deleteHouse = async (houseId: number | string) => {
  try {
    const headers = await getHeader();
    const response = await axios.delete(`${BASE_URL}/house/delete/${houseId}`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const updateHouse = async (
  houseId: number | string,
  formData: FormData
) => {
  try {
    const headers = await getHeader();
    const response = await axios.put(
      `${BASE_URL}/house/update/${houseId}`,
      formData,
      {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const favoriteHouse = async (
  userId: string | number,
  houseId: string | number
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/house/${userId}/favorites/${houseId}`,
      {
        headers: getHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const removeFavoriteHouse = async (
  userId: string | number,
  houseId: string | number
) => {
  try {
    const headers = await getHeader();
    const response = await axios.delete(
      `${BASE_URL}/house/${userId}/remove-favorite/${houseId}`,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const getAllFavoritedList = async (userId: string | number) => {
  try {
    const response = await axios.get(`${BASE_URL}/house/${userId}/favorites`);
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const isHouseFavoritedByUser = async (
  userId: string | number,
  houseId: string | number
) => {
  try {
    const response = await axios.get(`${BASE_URL}/house/isFavorite`, {
      params: { userId, houseId },
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

// BOOKING
export const bookHouse = async (
  houseId: number | string,
  userId: string | number,
  booking: BookHouse
) => {
  try {
    const headers = await getHeader();
    const response = await axios.post(
      `${BASE_URL}/booking/book-house/${houseId}/${userId}`,
      booking,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const getAllBookings = async () => {
  try {
    const headers = await getHeader();
    const response = await axios.get(`${BASE_URL}/booking/all`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const cancelBooking = async (bookingId: number | string) => {
  try {
    const headers = await getHeader();
    const response = await axios.delete(
      `${BASE_URL}/booking/cancel/${bookingId}`,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const getBookingsByUserId = async (userId: string | number) => {
  try {
    const headers = await getHeader();
    const response = await axios.get(
      `${BASE_URL}/booking/get-by-userId/${userId}`,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
  }
};

export const getBookedDatesByHouseId = async (houseId: number | string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/booking/${houseId}/booked-dates`
    );
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    return [];
  }
};
