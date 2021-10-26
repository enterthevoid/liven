import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import axios from "axios";
import jwt from "jwt-decode";

// Action Types
import {
  LOGIN,
  LOGIN_FAILURE,
  CHECK_AUTH,
  CHECK_AUTH_FAILURE,
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

    toast.success("Дарова Шефка");
  } catch (error) {
    let errorMessage = error;
    if (error?.response) {
      errorMessage = error.response.data.message;
    }

    toast.error(errorMessage);
    yield put(loginFailure(errorMessage));
  }
}

// Set data to local storage

export function setAccessToken({ token }) {
  return window.localStorage.setItem("accessToken", token);
}

export function setAuthUser({ formattedUser }) {
  return window.localStorage.setItem("authUser", JSON.stringify(formattedUser));
}

// Remove data from local storage
export function unsetAccessToken() {
  return window.localStorage.removeItem("accessToken");
}

export function unsetAuthUser() {
  return window.localStorage.removeItem("authUser");
}

// Check authentication

export function* checkAuth() {
  try {
    const accessToken = window.localStorage.getItem("accessToken");
    const authUser = window.localStorage.getItem("authUser");
    let currentTime = new Date().getTime() / 1000;
    let formattedUser;

    if (!accessToken || currentTime > jwt(accessToken).exp) {
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
  yield takeEvery(LOGIN, login);
  yield takeLatest(LOGIN_FAILURE, unsetAccessToken);

  yield takeLatest(CHECK_AUTH, checkAuth);

  yield takeLatest(CHECK_AUTH_FAILURE, checkAuthFailure);
  yield takeLatest(CHECK_AUTH_FAILURE, unsetAccessToken);
  yield takeLatest(CHECK_AUTH_FAILURE, unsetAccessToken);
  yield takeLatest(CHECK_AUTH_FAILURE, unsetAuthUser);
}
