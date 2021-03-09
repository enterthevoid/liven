import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// Dummy data
import data from "../../utils/dummy.json";

// Actions
import { loadWorksListFailure, loadWorksListSuccess } from "./actions";

// Action Types
import { LOAD_WORKS_LIST } from "./constants";

// API
// import { API_WORKS } from "../../config/api.config";

export function* loadWorksList({ offset, limit, workId }) {
  // const accessToken = global.window.localStorage.getItem("accessToken");
  const queryParams = [];

  queryParams.push(`limit=${limit}&offset=${offset}`);
  if (!!workId) {
    queryParams.push(`workId=${workId}`);
  }

  // const requestParams = {
  //   method: "get",
  //   url: `${API_WORKS}?${queryParams.join("&")}`,
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // };
  try {
    // const response = yield call(axios, requestParams);

    const { worksList, totalItemCount = 3 } = data;

    yield put(loadWorksListSuccess(worksList, totalItemCount));
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = error.response.data.message;
    }

    yield put(loadWorksListFailure());
    console.error("Load works list:", errorMessage);
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
}
