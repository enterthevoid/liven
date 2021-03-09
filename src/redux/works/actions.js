import {
  LOAD_WORKS_LIST,
  LOAD_WORKS_LIST_SUCCESS,
  LOAD_WORKS_LIST_FAILURE,
} from "./constants";

// Load works

export const loadWorksList = (query) => ({
  type: LOAD_WORKS_LIST,
  ...query,
});

export const loadWorksListSuccess = (worksList, totalItemCount) => ({
  type: LOAD_WORKS_LIST_SUCCESS,
  worksList,
  totalItemCount,
});

export const loadWorksListFailure = () => ({
  type: LOAD_WORKS_LIST_FAILURE,
});
