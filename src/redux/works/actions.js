import {
  LOAD_WORKS_LIST,
  LOAD_WORKS_LIST_SUCCESS,
  LOAD_WORKS_LIST_FAILURE,
  CREATE_WORK,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_FAILURE,
  UPDATE_WORK,
  UPDATE_WORK_SUCCESS,
  UPDATE_WORK_FAILURE,
  DELETE_WORK,
  DELETE_WORK_SUCCESS,
  DELETE_WORK_FAILURE,
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

// Create work

export const createWork = (work) => ({
  type: CREATE_WORK,
  work,
});

export const createWorkSuccess = (work) => ({
  type: CREATE_WORK_SUCCESS,
  work,
});

export const createWorkFailure = () => ({
  type: CREATE_WORK_FAILURE,
});

// Update work

export const updateWork = (work, workId) => ({
  type: UPDATE_WORK,
  work,
  workId,
});

export const updateWorkSuccess = (work) => ({
  type: UPDATE_WORK_SUCCESS,
  work,
});

export const updateWorkFailure = () => ({
  type: UPDATE_WORK_FAILURE,
});

// Delete work

export const deleteWork = (workId) => ({
  type: DELETE_WORK,
  workId,
});

export const deleteWorkSuccess = (workId) => ({
  type: DELETE_WORK_SUCCESS,
  workId,
});

export const deleteWorkFailure = () => ({
  type: DELETE_WORK_FAILURE,
});
