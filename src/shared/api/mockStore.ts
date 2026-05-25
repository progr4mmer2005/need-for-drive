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
      cars: Math.max(...SEED_CARS.map((c) => c.id)) + 1,
      orders: Math.max(...SEED_ORDERS.map((o) => o.id), 0) + 1,
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
  return new Promise((res) => setTimeout(() => res(value), ms));
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
    const car = db.cars.find((c) => c.id === id);
    if (!car) return Promise.reject({ response: { status: 404, data: { message: 'Not found' } } });
    return delay({ data: car });
  },
  create: (dto: Partial<Car> & { categoryId: { id: number } }): Promise<ApiResponse<Car>> => {
    const cat = db.categories.find((c) => c.id === dto.categoryId.id) || db.categories[0];
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
      categoryId: cat,
    };
    db.cars.push(car);
    saveDb();
    return delay({ data: car });
  },
  update: (id: number, dto: Partial<Car> & { categoryId?: { id: number } }): Promise<ApiResponse<Car>> => {
    const idx = db.cars.findIndex((c) => c.id === id);
    if (idx === -1) return Promise.reject({ response: { status: 404 } });
    const existing = db.cars[idx];
    const cat = dto.categoryId
      ? db.categories.find((c) => c.id === dto.categoryId!.id) || existing.categoryId
      : existing.categoryId;
    const updated: Car = { ...existing, ...dto, categoryId: cat };
    db.cars[idx] = updated;
    saveDb();
    return delay({ data: updated });
  },
  delete: (id: number) => {
    db.cars = db.cars.filter((c) => c.id !== id);
    saveDb();
    return delay({ data: undefined } as ApiResponse<unknown>);
  },
};

// ----- Orders -----
export const MOCK_ORDERS = {
  getAll: (params?: { limit?: number; page?: number }) => delay(paginate(db.orders, params)),
  getOne: (id: number): Promise<ApiResponse<Order>> => {
    const o = db.orders.find((x) => x.id === id);
    if (!o) return Promise.reject({ response: { status: 404 } });
    return delay({ data: o });
  },
  create: (dto: {
    cityId: { id: number }; pointId: { id: number }; carId: { id: number };
    rateId: { id: number }; orderStatusId?: { id: number };
    color: string; dateFrom: number; dateTo: number; price: number;
    isFullTank: boolean; isNeedChildChair: boolean; isRightWheel: boolean;
  }): Promise<ApiResponse<Order>> => {
    const order: Order = {
      id: db.nextId.orders++,
      cityId: db.cities.find((c) => c.id === dto.cityId.id) || db.cities[0],
      pointId: db.points.find((p) => p.id === dto.pointId.id) || db.points[0],
      carId: db.cars.find((c) => c.id === dto.carId.id) || db.cars[0],
      rateId: db.rates.find((r) => r.id === dto.rateId.id) || db.rates[0],
      orderStatusId: dto.orderStatusId
        ? db.orderStatuses.find((s) => s.id === dto.orderStatusId!.id) || db.orderStatuses[0]
        : db.orderStatuses[0],
      color: dto.color, dateFrom: dto.dateFrom, dateTo: dto.dateTo, price: dto.price,
      isFullTank: dto.isFullTank, isNeedChildChair: dto.isNeedChildChair, isRightWheel: dto.isRightWheel,
    };
    db.orders.push(order);
    saveDb();
    return delay({ data: order });
  },
  update: (id: number, dto: { orderStatusId?: { id: number } }): Promise<ApiResponse<Order>> => {
    const idx = db.orders.findIndex((o) => o.id === id);
    if (idx === -1) return Promise.reject({ response: { status: 404 } });
    const o = db.orders[idx];
    if (dto.orderStatusId) {
      const s = db.orderStatuses.find((x) => x.id === dto.orderStatusId!.id);
      if (s) o.orderStatusId = s;
    }
    saveDb();
    return delay({ data: o });
  },
  delete: (id: number) => {
    db.orders = db.orders.filter((o) => o.id !== id);
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
      const cid = Number(cityId);
      pts = pts.filter((p) => p.cityId.id === cid);
    }
    return delay({ data: pts, count: pts.length });
  },
};
export const MOCK_RATES = { getAll: () => delay({ data: db.rates, count: db.rates.length }) };
export const MOCK_RATE_TYPES = { getAll: () => delay({ data: db.rateTypes, count: db.rateTypes.length }) };
export const MOCK_CATEGORIES = { getAll: () => delay({ data: db.categories, count: db.categories.length }) };
export const MOCK_ORDER_STATUS = { getAll: () => delay({ data: db.orderStatuses, count: db.orderStatuses.length }) };


