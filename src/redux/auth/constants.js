/*
 * Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here.
 */

export const LOGIN = "LOGIN";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGOUT = "LOGOUT";

export const CHECK_AUTH = "CHECK_AUTH";
export const CHECK_AUTH_FAILURE = "CHECK_AUTH_FAILURE";
export const CHECK_AUTH_SUCCESS = "CHECK_AUTH_SUCCESS";
