import { all } from "redux-saga/effects";

// Sagas
import worksSaga from "./works/saga";

export default function* root() {
  yield all([worksSaga()]);
}
