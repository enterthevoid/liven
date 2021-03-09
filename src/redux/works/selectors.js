import { createSelector } from "reselect";

const selectWorksDomain = (state) => {
  return state.works;
};

// Works Stuff

const makeSelectWorkById = () => (state, id) =>
  selectWorksDomain(state).worksList[id];

const makeSelectWorksIdList = () =>
  createSelector(selectWorksDomain, (substate) => substate.worksLoadedIdList);

const makeSelectWorksList = () =>
  createSelector(selectWorksDomain, (substate) =>
    substate.worksLoadedIdList.reduce((carry, id) => {
      carry[id] = substate.worksList[id];
      return carry;
    }, {})
  );

const makeSelectWorksCount = () =>
  createSelector(selectWorksDomain, (substate) => substate.worksCount);

const makeSelectWorksLoadedCount = () =>
  createSelector(selectWorksDomain, (substate) => substate.worksLoadedCount);

const makeSelectWorksLoading = () =>
  createSelector(selectWorksDomain, (substate) => substate.worksLoading);

export {
  makeSelectWorkById,
  makeSelectWorksIdList,
  makeSelectWorksList,
  makeSelectWorksCount,
  makeSelectWorksLoadedCount,
  makeSelectWorksLoading,
};
