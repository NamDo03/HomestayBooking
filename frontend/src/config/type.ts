export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  userName: string;
  password: string;
};

export type UserDetail = {
  id: string | number;
  email: string;
  name: string;
};

export type House = {
  id: number;
  address: string;
  province: string;
  city: string;
  houseName: string;
  houseType: string;
  category: string;
  housePrice: number;
  housePhotoUrls: string[];
  houseDescription: string;
  bathroomCount: number;
  bedroomCount: number;
  guestCount: number;
  amenities: string[];
  bookings?: any[];
  userId: number | string;
};

export type BookHouse = {
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
};

export type ReservationDetails = {
  id: number;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  house: House;
};

export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
