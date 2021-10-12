import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { toast } from "react-toastify";

// Actions
import {
  loadWorksListFailure,
  loadWorksListSuccess,
  createWorkSuccess,
  createWorkFailure,
  updateWorkSuccess,
  updateWorkFailure,
  deleteWorkSuccess,
  deleteWorkFailure,
} from "./actions";
import { checkAuthFailure } from "../auth/actions";

// Action Types
import {
  LOAD_WORKS_LIST,
  CREATE_WORK,
  UPDATE_WORK,
  DELETE_WORK,
} from "./constants";

// API
import { API_WORKS } from "../../config/api";

export function* loadWorksList({ workId }) {
  const accessToken = window.localStorage.getItem("accessToken");
  const queryParams = [];
  if (!!workId) queryParams.push(`workId=${workId}`);

  const requestParams = {
    method: "get",
    url: `${API_WORKS}?${queryParams.join("&")}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = yield call(axios, requestParams);
    const { works, totalItemCount } = response.data;

    yield put(loadWorksListSuccess(works, totalItemCount));
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = error.response.data.message;
    }

    yield put(loadWorksListFailure());
    console.error("Load works list:", errorMessage);
  }
}

// Create work

export function* createWork({ work }) {
  const formData = new FormData();

  formData.append("name", work.name);
  formData.append("description", work.description);

  if (work.photos.length > 0) {
    work.photos.forEach((img) => formData.append("photos", img));
  }

  const accessToken = window.localStorage.getItem("accessToken");
  const requestParams = {
    method: "post",
    url: `${API_WORKS}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: formData,
  };
  try {
    const response = yield call(axios, requestParams);
    const { work } = response.data;

    yield put(createWorkSuccess(work));

    toast.success("Successfully created!");
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = error.response.data.message;

      if (error.response.status === 401) {
        yield put(checkAuthFailure());
      }
    }

    yield put(createWorkFailure());

    toast.error(errorMessage || "Error create work!");
    console.error("CREATE WORK:", errorMessage);
  }
}

// Update work

export function* updateWork({ work }) {
  const formData = new FormData();

  formData.append("name", work.name);
  formData.append("description", work.description);

  let oldImages = [];

  work.photos.forEach((photo) => {
    if (!!photo?.workId) {
      oldImages = [...oldImages, photo];
    } else {
      formData.append("photos", photo);
    }
  });

  if (oldImages.length > 0) {
    formData.append("photos", JSON.stringify(oldImages));
  }

  const accessToken = window.localStorage.getItem("accessToken");
  const requestParams = {
    method: "post",
    url: `${API_WORKS}/${work.id}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: formData,
  };
  try {
    const response = yield call(axios, requestParams);
    const { work } = response.data;

    yield put(updateWorkSuccess(work));

    toast.success("Successfully updated!");
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = error.response.data.message;

      if (error.response.status === 401) {
        yield put(checkAuthFailure());
      }
    }

    yield put(updateWorkFailure());

    toast.error(errorMessage || "Error update work");
    console.error("UPDATE WORK:", errorMessage);
  }
}

// Delete work

export function* deleteWork({ workId }) {
  const accessToken = window.localStorage.getItem("accessToken");
  const requestParams = {
    method: "delete",
    url: `${API_WORKS}/${workId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    yield call(axios, requestParams);

    yield put(deleteWorkSuccess(workId));
    toast.success("Successfully deleted!");
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = error.response.data.message;
    }

    if (error.response.status === 401) {
      yield put(checkAuthFailure());
    }

    yield put(deleteWorkFailure());

    toast.error("Error delete!");
    console.error("DELETE WORK:", errorMessage);
  }
}

export default function* overviewSaga() {
  yield takeLatest(LOAD_WORKS_LIST, loadWorksList);
  yield takeLatest(CREATE_WORK, createWork);
  yield takeLatest(UPDATE_WORK, updateWork);
  yield takeLatest(DELETE_WORK, deleteWork);
}
