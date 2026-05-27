/* In-memory + localStorage backed mock store. Mimics the NestJS backend. */
import {
  SEED_CARS, SEED_CATEGORIES, SEED_CITIES, SEED_ORDER_STATUSES, SEED_ORDERS,
  SEED_POINTS, SEED_RATE_TYPES, SEED_RATES,
} from './mockData';
import type {
  ApiResponse, Car, Category, City, Order, OrderStatus, Point, Rate, RateType,
} from './types';

const STORAGE_KEY = 'nfd_mock_db_v1';

interface DB {
  cars: Car[];
  categories: Category[];
  cities: City[];
  points: Point[];
  rates: Rate[];
  rateTypes: RateType[];
  orderStatuses: OrderStatus[];
  orders: Order[];
  nextId: { cars: number; orders: number };
}

function freshDb(): DB {
  return {
    cars: [...SEED_CARS],
    categories: [...SEED_CATEGORIES],
    cities: [...SEED_CITIES],
    points: [...SEED_POINTS],
    rates: [...SEED_RATES],
    rateTypes: [...SEED_RATE_TYPES],
    orderStatuses: [...SEED_ORDER_STATUSES],
    orders: [...SEED_ORDERS],
    nextId: {
      cars: Math.max(...SEED_CARS.map((car) => car.id)) + 1,
      orders: Math.max(...SEED_ORDERS.map((order) => order.id), 0) + 1,
    },
  };
}

function loadDb(): DB {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.cars) return parsed as DB;
    }
  } catch {
    // ignore
  }
  const fresh = freshDb();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

let db: DB = loadDb();

function saveDb() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // ignore quota errors
  }
}

export function resetMockDb() {
  db = freshDb();
  saveDb();
}

// simulate small network delay so loaders are visible
function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function paginate<T>(items: T[], params?: { limit?: number; page?: number }): ApiResponse<T[]> {
  const total = items.length;
  if (!params?.limit) return { data: items, count: total };
  const page = Math.max(1, params.page || 1);
  const start = (page - 1) * params.limit;
  return { data: items.slice(start, start + params.limit), count: total };
}

// ----- Cars -----
export const MOCK_CARS = {
  getAll: (params?: { limit?: number; page?: number }) => delay(paginate(db.cars, params)),
  getOne: (id: number): Promise<ApiResponse<Car>> => {
    const car = db.cars.find((existingCar) => existingCar.id === id);
    if (!car) return Promise.reject({ response: { status: 404, data: { message: 'Not found' } } });
    return delay({ data: car });
  },
  create: (dto: Partial<Car> & { categoryId: { id: number } }): Promise<ApiResponse<Car>> => {
    const category = db.categories.find((existingCategory) => existingCategory.id === dto.categoryId.id) || db.categories[0];
    const car: Car = {
      id: db.nextId.cars++,
      name: dto.name || 'Новый авто',
      priceMin: dto.priceMin || 0,
      priceMax: dto.priceMax || 0,
      colors: dto.colors || [],
      thumbnail: dto.thumbnail || null,
      description: dto.description || '',
      number: dto.number || '',
      tank: dto.tank || '',
      categoryId: category,
    };
    db.cars.push(car);
    saveDb();
    return delay({ data: car });
  },
  update: (id: number, dto: Partial<Car> & { categoryId?: { id: number } }): Promise<ApiResponse<Car>> => {
    const carIndex = db.cars.findIndex((existingCar) => existingCar.id === id);
    if (carIndex === -1) return Promise.reject({ response: { status: 404 } });
    const existingCar = db.cars[carIndex];
    const category = dto.categoryId
      ? db.categories.find((existingCategory) => existingCategory.id === dto.categoryId!.id) || existingCar.categoryId
      : existingCar.categoryId;
    const updated: Car = { ...existingCar, ...dto, categoryId: category };
    db.cars[carIndex] = updated;
    saveDb();
    return delay({ data: updated });
  },
  delete: (id: number) => {
    db.cars = db.cars.filter((existingCar) => existingCar.id !== id);
    saveDb();
    return delay({ data: undefined } as ApiResponse<unknown>);
  },
};

// ----- Orders -----
export const MOCK_ORDERS = {
  getAll: (params?: { limit?: number; page?: number }) => delay(paginate(db.orders, params)),
  getOne: (id: number): Promise<ApiResponse<Order>> => {
    const order = db.orders.find((existingOrder) => existingOrder.id === id);
    if (!order) return Promise.reject({ response: { status: 404 } });
    return delay({ data: order });
  },
  create: (dto: {
    cityId: { id: number }; pointId: { id: number }; carId: { id: number };
    rateId: { id: number }; orderStatusId?: { id: number };
    color: string; dateFrom: number; dateTo: number; price: number;
    isFullTank: boolean; isNeedChildChair: boolean; isRightWheel: boolean;
  }): Promise<ApiResponse<Order>> => {
    const order: Order = {
      id: db.nextId.orders++,
      cityId: db.cities.find((city) => city.id === dto.cityId.id) || db.cities[0],
      pointId: db.points.find((point) => point.id === dto.pointId.id) || db.points[0],
      carId: db.cars.find((car) => car.id === dto.carId.id) || db.cars[0],
      rateId: db.rates.find((rate) => rate.id === dto.rateId.id) || db.rates[0],
      orderStatusId: dto.orderStatusId
        ? db.orderStatuses.find((orderStatus) => orderStatus.id === dto.orderStatusId!.id) || db.orderStatuses[0]
        : db.orderStatuses[0],
      color: dto.color, dateFrom: dto.dateFrom, dateTo: dto.dateTo, price: dto.price,
      isFullTank: dto.isFullTank, isNeedChildChair: dto.isNeedChildChair, isRightWheel: dto.isRightWheel,
    };
    db.orders.push(order);
    saveDb();
    return delay({ data: order });
  },
  update: (id: number, dto: { orderStatusId?: { id: number } }): Promise<ApiResponse<Order>> => {
    const orderIndex = db.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) return Promise.reject({ response: { status: 404 } });
    const order = db.orders[orderIndex];
    if (dto.orderStatusId) {
      const orderStatus = db.orderStatuses.find((existingOrderStatus) => existingOrderStatus.id === dto.orderStatusId!.id);
      if (orderStatus) order.orderStatusId = orderStatus;
    }
    saveDb();
    return delay({ data: order });
  },
  delete: (id: number) => {
    db.orders = db.orders.filter((order) => order.id !== id);
    saveDb();
    return delay({ data: undefined } as ApiResponse<unknown>);
  },
};

// ----- Read-only collections -----
export const MOCK_CITIES = { getAll: () => delay({ data: db.cities, count: db.cities.length }) };
export const MOCK_POINTS = {
  getAll: (params?: Record<string, unknown>) => {
    let pts = db.points;
    const cityId = params && (params['cityId'] || params['city_id']);
    if (cityId) {
      const cityIdNumber = Number(cityId);
      pts = pts.filter((point) => point.cityId.id === cityIdNumber);
    }
    return delay({ data: pts, count: pts.length });
  },
};
export const MOCK_RATES = { getAll: () => delay({ data: db.rates, count: db.rates.length }) };
export const MOCK_RATE_TYPES = { getAll: () => delay({ data: db.rateTypes, count: db.rateTypes.length }) };
export const MOCK_CATEGORIES = { getAll: () => delay({ data: db.categories, count: db.categories.length }) };
export const MOCK_ORDER_STATUS = { getAll: () => delay({ data: db.orderStatuses, count: db.orderStatuses.length }) };


