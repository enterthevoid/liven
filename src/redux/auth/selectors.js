import { createSelector } from "reselect";

// Substates
const selectGlobal = (globalState) => globalState.auth;

// Auth
const makeSelectAuth = () =>
  createSelector(selectGlobal, (state) => state.auth);

// Token
const makeAuthToken = () =>
  createSelector(makeSelectAuth(), (state) => (state.auth || {}).token);

// Loader
const makeSelectLoading = () =>
  createSelector(selectGlobal, (state) => state.loading);

// Auth Checked
const makeSelectAuthChecked = () =>
  createSelector(selectGlobal, (state) => state.authChecked);

export {
  makeSelectAuth,
  makeAuthToken,
  makeSelectLoading,
  makeSelectAuthChecked,
};
