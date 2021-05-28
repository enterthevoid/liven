import { call, put, takeEvery } from "redux-saga/effects";
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

// Action Types
import {
  LOAD_WORKS_LIST,
  CREATE_WORK,
  UPDATE_WORK,
  DELETE_WORK,
} from "./constants";

// API
import { API_WORKS } from "../../config/api";

export function* loadWorksList({ offset, limit, workId }) {
  const accessToken = global.window.localStorage.getItem("accessToken");
  const queryParams = [];

  if (!!limit && offset) queryParams.push(`limit=${limit}&offset=${offset}`);
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
    work.photos.map((img) => formData.append("photos", img));
  }

  const accessToken = global.window.localStorage.getItem("accessToken");
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

    toast.success("Successfully created!", {
      position: "top-center",
      autoClose: 3000,
    });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = error.response.data.message;
    }

    toast.error(errorMessage || "Error create work!", {
      position: "top-center",
      autoClose: 3000,
    });

    yield put(createWorkFailure());
    console.error("CREATE WORK:", errorMessage);
  }
}

// Update work

export function* updateWork({ work }) {
  const formData = new FormData();

  formData.append("name", work.name);
  formData.append("description", work.description);
  formData.append("photos", work.photos);

  const accessToken = global.window.localStorage.getItem("accessToken");
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

    toast.success("Successfully created!", {
      position: "top-center",
      autoClose: 3000,
    });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = error.response.data.message;
    }

    toast.error(errorMessage || "Error update work", {
      position: "top-center",
      autoClose: 3000,
    });

    yield put(updateWorkFailure());

    console.error("UPDATE WORK:", errorMessage);
  }
}

// Delete work

export function* deleteWork({ workId }) {
  const accessToken = global.window.localStorage.getItem("accessToken");
  const requestParams = {
    method: "delete",
    url: `${API_WORKS}/${workId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    yield call(axios, requestParams);

    toast.success("Successfully deleted!", {
      position: "top-center",
      autoClose: 3000,
    });

    yield put(deleteWorkSuccess(workId));
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = error.response.data.message;
    }

    toast.error("Error delete!", {
      position: "top-center",
      autoClose: 3000,
    });
    yield put(deleteWorkFailure());
    console.error("DELETE WORK:", errorMessage);
  }
}

// export function* loadWork({ workId }) {
//   const accessToken = global.window.localStorage.getItem("accessToken");
//   const requestParams = {
//     method: "get",
//     url: `${API_WORKS}/${workId}`,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };

//   try {
//     const response = yield call(axios, requestParams);
//     const { work } = response.data;
//     yield put(updateLocationSuccess(work));
//   } catch (error) {
//     yield put(updateLocationFailure());
//     console.error(`Load Works ${workId}:`, error);
//   }
// }

export default function* overviewSaga() {
  yield takeEvery(LOAD_WORKS_LIST, loadWorksList);
  yield takeEvery(CREATE_WORK, createWork);
  yield takeEvery(UPDATE_WORK, updateWork);
  yield takeEvery(DELETE_WORK, deleteWork);
}
