/*
 * Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here.
 */

// Load  works
export const LOAD_WORKS_LIST = "LOAD_WORKS_LIST";
export const LOAD_WORKS_LIST_SUCCESS = "LOAD_WORKS_LIST_SUCCESS";
export const LOAD_WORKS_LIST_FAILURE = "LOAD_WORKS_LIST_FAILURE";

// Create work

export const CREATE_WORK = "CREATE_WORK";
export const CREATE_WORK_SUCCESS = "CREATE_WORK_SUCCESS";
export const CREATE_WORK_FAILURE = "CREATE_WORK_FAILURE";

// Update work

export const UPDATE_WORK = "UPDATE_WORK";
export const UPDATE_WORK_SUCCESS = "UPDATE_WORK_SUCCESS";
export const UPDATE_WORK_FAILURE = "UPDATE_WORK_FAILURE";

// Delete work

export const DELETE_WORK = "DELETE_WORK";
export const DELETE_WORK_SUCCESS = "DELETE_WORK_SUCCESS";
export const DELETE_WORK_FAILURE = "DELETE_WORK_FAILURE";
