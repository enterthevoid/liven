/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import worksReducer from "./works/reducer";

/**
 * Merges the main reducer with the router state
 */
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    works: worksReducer,
  });

export default rootReducer;
