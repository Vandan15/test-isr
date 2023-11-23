export const TOKEN = 'TOKEN';
export const ROUTES = {
  HOME: '/movies',
  LOGIN: '/login',
  PERSONS: '/persons',
  MOVIES: '/movies',
};

export const LIMIT = 20;

export const initialFilter = {
  skip: 0,
  limit: LIMIT,
};

export const initialSort = {
  field: 'createdAt',
  order: 'DESC',
};

export const initialVariables = {
  filter: initialFilter,
  sort: initialSort,
};
