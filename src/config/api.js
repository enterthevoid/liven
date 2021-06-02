// API Endpoints

const API_URL = () =>
  process.env.REACT_APP_API_URL || "https://gentle-forest-86099.herokuapp.com";

// "http://localhost:4000";

export const API_LOGIN = `${API_URL()}/user/login`;

export const API_USER = `${API_URL()}/user/`;

export const API_WORKS = `${API_URL()}/works`;
