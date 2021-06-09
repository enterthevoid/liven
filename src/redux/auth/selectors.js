import { createSelector } from "reselect";

// Substates
const selectAuthDomain = (state) => state.auth;

// Auth
const makeSelectAuth = () =>
  createSelector(selectAuthDomain, (state) => state.auth);

// Token
const makeAuthToken = () =>
  createSelector(makeSelectAuth, (state) => (state.auth || {}).token);

// Loader
const makeSelectLoading = () =>
  createSelector(selectAuthDomain, (state) => state.loading);

// Auth Checked
const makeSelectAuthChecked = () =>
  createSelector(selectAuthDomain, (state) => state.authChecked);

export {
  makeSelectAuth,
  makeAuthToken,
  makeSelectLoading,
  makeSelectAuthChecked,
};
