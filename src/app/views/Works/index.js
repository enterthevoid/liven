import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { isBrowser } from "react-device-detect";

// Selectors
import {
  makeSelectWorksCount,
  makeSelectWorksLoading,
  makeSelectWorksIdList,
} from "../../../redux/works/selectors";

// Actions
import { loadWorksList } from "../../../redux/works/actions";

// Components
import WorkItem from "../../components/WorkItem";
import Loader from "../../components/Loader";

class Works extends Component {
  componentDidMount() {
    const { onLoadWorksList, worksCount, worksLoading } = this.props;

    if (worksCount === null && !worksLoading) onLoadWorksList();
  }

  isNotSelected = () => {
    const { location, worksLoadedIds } = this.props;

    return isBrowser && worksLoadedIds.length > 0 && location.search === "";
  };

  componentDidUpdate() {
    const { history, worksLoadedIds } = this.props;

    if (this.isNotSelected()) {
      history.push({
        search: `?${worksLoadedIds[0]}`,
      });
    }
  }

  render() {
    const { location, worksLoadedIds, worksLoading } = this.props;

    if (worksLoading) {
      return <Loader />;
    }

    return (
      <WorkItem
        workId={
          this.isNotSelected()
            ? worksLoadedIds[0]
            : location.search.substring(1)
        }
      />
    );
  }
}

// Props

Works.propTypes = {
  worksCount: PropTypes.number,
  worksLoading: PropTypes.bool,
  worksLoadedIds: PropTypes.array,
  onLoadWorksList: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  worksCount: makeSelectWorksCount(),
  worksLoading: makeSelectWorksLoading(),
  worksLoadedIds: makeSelectWorksIdList(),
});

const mapDispatchToProps = {
  onLoadWorksList: () => loadWorksList(),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Works));
