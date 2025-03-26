export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  HEALTH_GUIDELINES: '/health-guidelines',
  RESOURCES: {
    ROOT: '/resources',
    REGIONAL_DATA: '/resources/regional-data',
    VACCINATION: '/resources/vaccination',
    TESTING: '/resources/testing',
  },
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
};

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
];

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.ABOUT,
];
