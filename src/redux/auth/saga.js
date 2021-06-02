/* eslint-disable require-yield */
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import axios from "axios";

// Action Types
import {
  LOGIN,
  LOGIN_FAILURE,
  CHECK_AUTH,
  CHECK_AUTH_FAILURE,
  LOGOUT,
} from "./constants";

// Actions
import {
  loginSuccess,
  loginFailure,
  checkAuthSuccess,
  checkAuthFailure,
} from "./actions";

// API
import { API_LOGIN } from "../../config/api";

// Login

export function* login({ credentials }) {
  const requestParams = {
    method: "post",
    url: API_LOGIN,
    data: credentials,
  };
  try {
    const response = yield call(axios, requestParams);
    const { token, user } = response.data;

    const formattedUser = {
      ...user,
      accessToken: token,
    };

    yield put(loginSuccess(formattedUser));
    yield call(setAuthUser, { formattedUser });
    yield call(setAccessToken, { token });

    // yield call(setRefreshToken, { refreshToken });

    toast.success("Дарова Шефка", {
      position: "top-center",
      autoClose: 5000,
    });
  } catch (error) {
    let errorMessage = error;
    if (error?.response) {
      errorMessage = error.response.data.message;
    }
    if (error.response.data.statusCode === 401) {
      errorMessage = "Incorrect username or password.";
    }
    toast.error("Wrong login or password", {
      position: "top-center",
      autoClose: 5000,
    });
    yield put(loginFailure(errorMessage));
  }
}

// Set data to local storage

export function* setAccessToken({ token }) {
  return global.window.localStorage.setItem("accessToken", token);
}

export function* setRefreshToken({ refreshToken }) {
  return global.window.localStorage.setItem("refreshToken", refreshToken);
}

export function* setAuthUser({ formattedUser }) {
  return global.window.localStorage.setItem(
    "authUser",
    JSON.stringify(formattedUser)
  );
}

// Remove data from local storage

export function* unsetAccessToken() {
  return global.window.localStorage.removeItem("accessToken");
}

export function* unsetRefreshToken() {
  return global.window.localStorage.removeItem("refreshToken");
}

export function* unsetAuthUser() {
  return global.window.localStorage.removeItem("authUser");
}

// Check authentication

export function* checkAuth() {
  try {
    const accessToken = global.window.localStorage.getItem("accessToken");
    // const refreshToken = global.window.localStorage.getItem("refreshToken");
    const authUser = global.window.localStorage.getItem("authUser");
    let formattedUser;

    if (!accessToken) {
      yield put(checkAuthFailure());
    }

    if (authUser !== undefined && authUser !== null) {
      formattedUser = JSON.parse(authUser);

      if (!accessToken) {
        yield call(setAccessToken, {
          accessToken: formattedUser.accessToken,
        });
        window.location.reload();
      }
    }
    if (accessToken && formattedUser && formattedUser.id) {
      const user = { ...formattedUser, accessToken };

      yield put(
        checkAuthSuccess({
          accessToken,
          user,
        })
      );
    }
  } catch (error) {
    yield put(checkAuthFailure());
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(LOGIN_FAILURE, unsetAccessToken);
  yield takeLatest(LOGIN_FAILURE, unsetRefreshToken);

  yield takeLatest(LOGOUT, unsetAccessToken);
  yield takeLatest(LOGOUT, unsetAuthUser);
  yield takeLatest(LOGOUT, unsetRefreshToken);

  yield takeLatest(CHECK_AUTH, checkAuth);
  yield takeLatest(CHECK_AUTH_FAILURE, unsetAccessToken);
}
