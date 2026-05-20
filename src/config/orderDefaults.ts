const ru = String.fromCharCode;

export const ORDER_DEFAULTS = {
  CITY: ru(1059, 1083, 1100, 1103, 1085, 1086, 1074, 1089, 1082),
  COLOR: ru(1043, 1086, 1083, 1091, 1073, 1086, 1081),
  RATE_ID: 'daily',
  EXTRAS: ['fullTank'] as readonly string[],
  CATEGORY: ru(1042, 1089, 1077, 32, 1084, 1086, 1076, 1077, 1083, 1080),
  MIN_PRICE: 8000,
  MAX_PRICE: 12000,
} as const;
