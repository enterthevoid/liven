import { createSelector } from "reselect";

// Substates
const selectWorksDomain = (state) => {
  return state.works;
};

// Get work by id
const makeSelectWorkById = () => (state, id) =>
  selectWorksDomain(state).worksList[id];

// Loaded id list
const makeSelectWorksIdList = () =>
  createSelector(selectWorksDomain, (state) => state.worksLoadedIdList);

// Work List
const makeSelectWorksList = () =>
  createSelector(selectWorksDomain, (state) =>
    state.worksLoadedIdList.reduce((carry, id) => {
      carry[id] = state.worksList[id];
      return carry;
    }, {})
  );

// Count
const makeSelectWorksCount = () =>
  createSelector(selectWorksDomain, (state) => state.worksCount);

// Loaded Count
const makeSelectWorksLoadedCount = () =>
  createSelector(selectWorksDomain, (state) => state.worksLoadedCount);

// Loader
const makeSelectWorksLoading = () =>
  createSelector(selectWorksDomain, (state) => state.worksLoading);

export {
  makeSelectWorkById,
  makeSelectWorksIdList,
  makeSelectWorksList,
  makeSelectWorksCount,
  makeSelectWorksLoadedCount,
  makeSelectWorksLoading,
};
