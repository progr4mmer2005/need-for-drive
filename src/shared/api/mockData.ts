import type {
  City, Point, Category, Car, RateType, Rate, OrderStatus, Order,
} from './types';

export const SEED_CATEGORIES: Category[] = [
  { id: 1, name: 'Эконом' },
  { id: 2, name: 'Премиум' },
];

export const SEED_CITIES: City[] = [
  { id: 1, name: 'Ульяновск' },
  { id: 2, name: 'Казань' },
  { id: 3, name: 'Москва' },
  { id: 4, name: 'Самара' },
];

export const SEED_POINTS: Point[] = [
  { id: 1, name: 'Нариманова 42', address: 'Нариманова 42', cityId: SEED_CITIES[0] },
  { id: 2, name: 'Гончарова 11', address: 'Гончарова 11', cityId: SEED_CITIES[0] },
  { id: 3, name: 'Пушкарёва 19', address: 'Пушкарёва 19', cityId: SEED_CITIES[0] },
  { id: 4, name: 'Пушкина 5', address: 'Пушкина 5', cityId: SEED_CITIES[1] },
  { id: 5, name: 'Кремлёвская 9', address: 'Кремлёвская 9', cityId: SEED_CITIES[1] },
  { id: 6, name: 'Ленина 12', address: 'Ленина 12', cityId: SEED_CITIES[3] },
  { id: 7, name: 'Куйбышева 5', address: 'Куйбышева 5', cityId: SEED_CITIES[3] },
  { id: 8, name: 'Новый Арбат 1', address: 'Новый Арбат 1', cityId: SEED_CITIES[2] },
  { id: 9, name: 'Тверская 10', address: 'Тверская 10', cityId: SEED_CITIES[2] },
];

export const SEED_RATE_TYPES: RateType[] = [
  { id: 1, name: 'Поминутно', unit: 'мин' },
  { id: 2, name: 'На сутки', unit: 'сут' },
];

export const SEED_RATES: Rate[] = [
  { id: 1, price: 7, rateTypeId: SEED_RATE_TYPES[0] },
  { id: 2, price: 1999, rateTypeId: SEED_RATE_TYPES[1] },
];

export const SEED_ORDER_STATUSES: OrderStatus[] = [
  { id: 1, name: 'Новый' },
  { id: 2, name: 'В процессе' },
  { id: 3, name: 'Отменен' },
  { id: 4, name: 'Подтвержден' },
];

export const SEED_CARS: Car[] = [
  {
    id: 1, name: 'Hyundai ELANTRA', priceMin: 12000, priceMax: 25000,
    colors: ['Красный', 'Синий', 'Белый', 'Чёрный'],
    thumbnail: { path: '', originalname: 'elantra.jpg', mimetype: 'image/jpeg' },
    description: 'Стильный седан для городских поездок',
    number: 'А 123 БВ 73', tank: '92', categoryId: SEED_CATEGORIES[0],
  },
  {
    id: 2, name: 'Hyundai i30 N', priceMin: 10000, priceMax: 32000,
    colors: ['Красный', 'Синий', 'Белый'],
    thumbnail: { path: '', originalname: 'i30n.jpg', mimetype: 'image/jpeg' },
    description: 'Спортивный хетчбэк с мощным двигателем',
    number: 'К 761 НА 73', tank: '95', categoryId: SEED_CATEGORIES[1],
  },
  {
    id: 3, name: 'Hyundai CRETA', priceMin: 12000, priceMax: 25000,
    colors: ['Оранжевый', 'Белый', 'Серый'],
    thumbnail: { path: '', originalname: 'creta.jpg', mimetype: 'image/jpeg' },
    description: 'Комфортный кроссовер для любых дорог',
    number: 'В 456 ГД 73', tank: '95', categoryId: SEED_CATEGORIES[0],
  },
  {
    id: 4, name: 'Hyundai SONATA', priceMin: 10000, priceMax: 32000,
    colors: ['Тёмно-синий', 'Серебристый', 'Белый'],
    thumbnail: { path: '', originalname: 'sonata.jpg', mimetype: 'image/jpeg' },
    description: 'Представительский седан бизнес-класса',
    number: 'Е 789 ЖЗ 73', tank: '95', categoryId: SEED_CATEGORIES[1],
  },
];

export const SEED_ORDERS: Order[] = [
  {
    id: 1,
    orderStatusId: SEED_ORDER_STATUSES[1],
    cityId: SEED_CITIES[0],
    pointId: SEED_POINTS[0],
    carId: SEED_CARS[0],
    rateId: SEED_RATES[1],
    color: 'Голубой',
    dateFrom: Date.now() - 86400000,
    dateTo: Date.now() + 86400000,
    price: 4300,
    isFullTank: true,
    isNeedChildChair: false,
    isRightWheel: false,
  },
];
