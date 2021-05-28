import { all } from "redux-saga/effects";

// Sagas
import worksSaga from "./works/saga";
import authSaga from "./auth/saga";

export default function* root() {
  yield all([worksSaga(), authSaga()]);
}
