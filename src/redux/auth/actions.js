import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  // CHECK_AUTH,
  // CHECK_AUTH_SUCCESS,
  // CHECK_AUTH_FAILURE,
  LOGOUT,
} from "./constants";

// Login

export const login = (credentials) => ({
  type: LOGIN,
  credentials,
});

export const loginSuccess = (formattedUser) => ({
  type: LOGIN_SUCCESS,
  formattedUser,
});

export const loginFailure = (errors) => ({
  type: LOGIN_FAILURE,
  errors,
});

// Logout

export const logout = () => ({
  type: LOGOUT,
});

// Check auth

// export const checkAuth = () => ({
//   type: CHECK_AUTH,
// });

// export const checkAuthSuccess = (userData: {
//   user: any,
//   accessToken: string,
// }) => ({
//   type: CHECK_AUTH_SUCCESS,
//   userData,
// });

// export const checkAuthFailure = () => ({
//   type: CHECK_AUTH_FAILURE,
// });
