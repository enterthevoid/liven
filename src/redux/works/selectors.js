import { createSelector } from "reselect";

const selectWorksDomain = (state) => {
  return state.works;
};

const makeSelectWorkById = () => (state, id) =>
  selectWorksDomain(state).worksList[id];

const makeSelectWorksIdList = () =>
  createSelector(selectWorksDomain, (state) => state.worksLoadedIdList);

const makeSelectWorksList = () =>
  createSelector(selectWorksDomain, (state) =>
    state.worksLoadedIdList.reduce((carry, id) => {
      carry[id] = state.worksList[id];
      return carry;
    }, {})
  );

const makeSelectWorksCount = () =>
  createSelector(selectWorksDomain, (state) => state.worksCount);

const makeSelectWorksLoadedCount = () =>
  createSelector(selectWorksDomain, (state) => state.worksLoadedCount);

const makeSelectWorksLoading = () =>
  createSelector(selectWorksDomain, (state) => state.worksLoading);

const makeSelectWorkCreating = () =>
  createSelector(selectWorksDomain, (state) => state.workCreating);

const makeSelectWorkUpdating = () =>
  createSelector(selectWorksDomain, (state) => state.workUpdating);

const makeSelectWorkDeleting = () =>
  createSelector(selectWorksDomain, (state) => state.workDeleting);

export {
  makeSelectWorkById,
  makeSelectWorksIdList,
  makeSelectWorksList,
  makeSelectWorksCount,
  makeSelectWorksLoadedCount,
  makeSelectWorksLoading,
  makeSelectWorkCreating,
  makeSelectWorkUpdating,
  makeSelectWorkDeleting,
};
