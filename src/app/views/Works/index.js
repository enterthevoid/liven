import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import {
  makeSelectWorksLoading,
  makeSelectWorksIdList,
  makeSelectWorksList,
} from "../../../redux/works/selectors";
import WorkItem from "../../components/WorkItem";
import Loader from "../../components/Loader";
import { useWindowDimensions } from "../../../utils/helpers";

const Works = ({
  worksLoading,
  worksLoadedIds,
  worksList,
  location,
  history,
}) => {
  const { innerWidth } = useWindowDimensions();
  const upMediumScreen = innerWidth > 900;
  const isNotSelected =
    upMediumScreen && worksLoadedIds?.length > 0 && location.search === "";

  useEffect(() => {
    if (isNotSelected) {
      history.push({ search: `?${worksLoadedIds[0]}` });
    }
  }, [isNotSelected]);

  if (worksLoading) {
    return <Loader />;
  }

  const workLinks = Object.values(worksList).map((work) => ({
    name: work.name,
    workId: work.id,
  }));

  return (
    <WorkItem
      workLinks={workLinks}
      workId={isNotSelected ? worksLoadedIds[0] : location.search.substring(1)}
    />
  );
};

Works.propTypes = {
  worksLoading: PropTypes.bool,
  worksLoadedIds: PropTypes.array,
  worksList: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  worksLoading: makeSelectWorksLoading(),
  worksLoadedIds: makeSelectWorksIdList(),
  worksList: makeSelectWorksList(),
});

export default withRouter(connect(mapStateToProps, {})(Works));
