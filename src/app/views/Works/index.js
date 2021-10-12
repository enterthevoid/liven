import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { isBrowser } from "react-device-detect";

// Selectors
import {
  makeSelectWorksLoading,
  makeSelectWorksIdList,
} from "../../../redux/works/selectors";

// Components
import WorkItem from "../../components/WorkItem";
import Loader from "../../components/Loader";

const Works = ({ worksLoading, worksLoadedIds, location, history }) => {
  const isNotSelected =
    isBrowser && worksLoadedIds?.length > 0 && location.search === "";

  useEffect(() => {
    if (isNotSelected) {
      history.push({ search: `?${worksLoadedIds[0]}` });
    }
  }, [isNotSelected]);

  if (worksLoading) {
    return <Loader />;
  }

  return (
    <WorkItem
      workId={isNotSelected ? worksLoadedIds[0] : location.search.substring(1)}
    />
  );
};

// Props

Works.propTypes = {
  worksLoading: PropTypes.bool,
  worksLoadedIds: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  worksLoading: makeSelectWorksLoading(),
  worksLoadedIds: makeSelectWorksIdList(),
});

export default withRouter(connect(mapStateToProps, {})(Works));
