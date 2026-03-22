export const IMGS_URL =
  process.env.NODE_ENV === 'production'
    ? '/uploads/'
    : 'http://localhost:9000/uploads';

export const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9000';
