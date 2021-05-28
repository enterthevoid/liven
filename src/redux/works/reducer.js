import keyBy from "lodash/keyBy";

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

// Default State
const DEFAULT_STATE = {
  worksLoadedIdList: [],
  worksList: {},
  worksCount: null,
  worksLoading: false,
  workDeleting: false,
  workCreating: false,
  workUpdating: false,
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

    // Delete work

    case DELETE_WORK:
      return { ...state, workDeleting: true };

    case DELETE_WORK_SUCCESS: {
      const { workId } = action;
      let { worksList, worksLoadedIdList } = state;

      let filteredWorksList = worksList;
      delete filteredWorksList[workId];

      let filteredWorksLoadedIdList = worksLoadedIdList.filter(
        (id) => id !== workId
      );

      return {
        ...state,
        workDeleting: false,
        worksLoadedIdList: filteredWorksLoadedIdList,
        worksList: filteredWorksList,
        worksCount: state.worksCount - 1,
      };
    }

    case DELETE_WORK_FAILURE:
      return { ...state, workDeleting: false };

    // Create work

    case CREATE_WORK:
      return { ...state, workCreating: true };

    case CREATE_WORK_SUCCESS: {
      const { work } = action;

      return {
        ...state,
        workCreating: false,
        worksList: { [work?.id]: work, ...state.worksList },
        worksLoadedIdList: [work?.id, ...state.worksLoadedIdList],
        worksCount: state.countAreasCount + 1,
      };
    }

    case CREATE_WORK_FAILURE:
      return { ...state, workCreating: false };

    // Update work

    case UPDATE_WORK:
      return { ...state, workUpdating: true };

    case UPDATE_WORK_SUCCESS: {
      const { work } = action;

      if (!state.worksList[work.id]) {
        return state;
      }

      return {
        ...state,
        workUpdating: false,
        worksList: {
          ...state.worksList,
          [work.id]: {
            ...(state.worksList[work.id] || {}),
            ...work,
          },
        },
      };
    }

    case UPDATE_WORK_FAILURE:
      return { ...state, workUpdating: false };

    default:
      return state;
  }
}

export default worksReducer;
