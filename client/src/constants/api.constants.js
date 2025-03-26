export const API_ENDPOINTS = {
  HEALTH_DATA: '/health-data',
  REGIONAL_DATA: '/health-data/regional',
  VACCINATION_SITES: '/vaccination-sites',
  TESTING_CENTERS: '/testing-centers',
  HEALTH_GUIDELINES: '/health-guidelines',
  ALERTS: '/alerts',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const API_ERROR_MESSAGES = {
  DEFAULT: 'An error occurred. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
};
