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
