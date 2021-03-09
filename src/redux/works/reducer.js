import keyBy from "lodash/keyBy";

import {
  LOAD_WORKS_LIST,
  LOAD_WORKS_LIST_SUCCESS,
  LOAD_WORKS_LIST_FAILURE,
} from "./constants";

// Default State
const DEFAULT_STATE = {
  worksLoadedIdList: [],
  worksList: {},
  worksCount: null,
  worksLoading: false,
};

function worksReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    // Load works list

    case LOAD_WORKS_LIST:
      return { ...state, worksLoading: true };

    case LOAD_WORKS_LIST_SUCCESS: {
      const { worksList, totalItemCount, append } = action;

      const formatedWorks = keyBy(worksList, (workItem) => workItem.id);

      const worksLoadedIdList = Object.values(worksList).map(
        (workItem) => workItem.id
      );

      return {
        ...state,
        worksLoading: false,
        worksLoadedIdList: append
          ? [...state.worksLoadedIdList, ...worksLoadedIdList]
          : worksLoadedIdList,
        worksList: append
          ? { ...state.worksList, ...formatedWorks }
          : formatedWorks,
        worksLoadedCount: append
          ? state.worksLoadedCount + worksList.length
          : worksList.length,
        worksCount: totalItemCount,
      };
    }

    case LOAD_WORKS_LIST_FAILURE:
      return { ...state, worksLoading: false };

    default:
      return state;
  }
}

export default worksReducer;
