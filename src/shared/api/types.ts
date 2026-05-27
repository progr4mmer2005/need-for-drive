export interface ApiResponse<T> {
  data: T;
  count?: number;
}

export interface City {
  id: number;
  name: string;
}

export interface Point {
  id: number;
  name: string;
  address: string;
  cityId: City;
}

export interface Category {
  id: number;
  name: string;
}

export interface Thumbnail {
  path: string;
  originalname: string;
  mimetype: string;
}

export interface Car {
  id: number;
  name: string;
  priceMin: number;
  priceMax: number;
  colors: string[];
  thumbnail: Thumbnail | null;
  description: string;
  number: string;
  tank: string;
  categoryId: Category;
}

export interface RateType {
  id: number;
  name: string;
  unit: string;
}

export interface Rate {
  id: number;
  price: number;
  rateTypeId: RateType;
}

export interface OrderStatus {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  orderStatusId: OrderStatus;
  cityId: City;
  pointId: Point;
  carId: Car;
  rateId: Rate;
  color: string;
  dateFrom: number;
  dateTo: number;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

export interface QueryParams {
  limit?: number;
  page?: number;
  [key: string]: unknown;
}
