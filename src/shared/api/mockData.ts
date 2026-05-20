import type {
  City, Point, Category, Car, RateType, Rate, OrderStatus, Order,
} from './types';

// Seed data used on first run; afterwards everything lives in localStorage
export const seedCategories: Category[] = [
  { id: 1, name: 'Эконом' },
  { id: 2, name: 'Премиум' },
];

export const seedCities: City[] = [
  { id: 1, name: 'Ульяновск' },
  { id: 2, name: 'Казань' },
  { id: 3, name: 'Москва' },
  { id: 4, name: 'Самара' },
];

export const seedPoints: Point[] = [
  { id: 1, name: 'Нариманова 42', address: 'Нариманова 42', cityId: seedCities[0] },
  { id: 2, name: 'Гончарова 11', address: 'Гончарова 11', cityId: seedCities[0] },
  { id: 3, name: 'Пушкарёва 19', address: 'Пушкарёва 19', cityId: seedCities[0] },
  { id: 4, name: 'Пушкина 5', address: 'Пушкина 5', cityId: seedCities[1] },
  { id: 5, name: 'Кремлёвская 9', address: 'Кремлёвская 9', cityId: seedCities[1] },
  { id: 6, name: 'Ленина 12', address: 'Ленина 12', cityId: seedCities[3] },
  { id: 7, name: 'Куйбышева 5', address: 'Куйбышева 5', cityId: seedCities[3] },
  { id: 8, name: 'Новый Арбат 1', address: 'Новый Арбат 1', cityId: seedCities[2] },
  { id: 9, name: 'Тверская 10', address: 'Тверская 10', cityId: seedCities[2] },
];

export const seedRateTypes: RateType[] = [
  { id: 1, name: 'Поминутно', unit: 'мин' },
  { id: 2, name: 'На сутки', unit: 'сут' },
];

export const seedRates: Rate[] = [
  { id: 1, price: 7, rateTypeId: seedRateTypes[0] },
  { id: 2, price: 1999, rateTypeId: seedRateTypes[1] },
];

export const seedOrderStatuses: OrderStatus[] = [
  { id: 1, name: 'Новый' },
  { id: 2, name: 'В процессе' },
  { id: 3, name: 'Отменен' },
  { id: 4, name: 'Подтвержден' },
];

export const seedCars: Car[] = [
  {
    id: 1, name: 'Hyundai ELANTRA', priceMin: 12000, priceMax: 25000,
    colors: ['Красный', 'Синий', 'Белый', 'Чёрный'],
    thumbnail: { path: '', originalname: 'elantra.jpg', mimetype: 'image/jpeg' },
    description: 'Стильный седан для городских поездок',
    number: 'А 123 БВ 73', tank: '92', categoryId: seedCategories[0],
  },
  {
    id: 2, name: 'Hyundai i30 N', priceMin: 10000, priceMax: 32000,
    colors: ['Красный', 'Синий', 'Белый'],
    thumbnail: { path: '', originalname: 'i30n.jpg', mimetype: 'image/jpeg' },
    description: 'Спортивный хетчбэк с мощным двигателем',
    number: 'К 761 НА 73', tank: '95', categoryId: seedCategories[1],
  },
  {
    id: 3, name: 'Hyundai CRETA', priceMin: 12000, priceMax: 25000,
    colors: ['Оранжевый', 'Белый', 'Серый'],
    thumbnail: { path: '', originalname: 'creta.jpg', mimetype: 'image/jpeg' },
    description: 'Комфортный кроссовер для любых дорог',
    number: 'В 456 ГД 73', tank: '95', categoryId: seedCategories[0],
  },
  {
    id: 4, name: 'Hyundai SONATA', priceMin: 10000, priceMax: 32000,
    colors: ['Тёмно-синий', 'Серебристый', 'Белый'],
    thumbnail: { path: '', originalname: 'sonata.jpg', mimetype: 'image/jpeg' },
    description: 'Представительский седан бизнес-класса',
    number: 'Е 789 ЖЗ 73', tank: '95', categoryId: seedCategories[1],
  },
];

export const seedOrders: Order[] = [
  {
    id: 1,
    orderStatusId: seedOrderStatuses[1],
    cityId: seedCities[0],
    pointId: seedPoints[0],
    carId: seedCars[0],
    rateId: seedRates[1],
    color: 'Голубой',
    dateFrom: Date.now() - 86400000,
    dateTo: Date.now() + 86400000,
    price: 4300,
    isFullTank: true,
    isNeedChildChair: false,
    isRightWheel: false,
  },
];
