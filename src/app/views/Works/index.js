import React, { Component } from "react";
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

// Styles
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.scss";

class Works extends Component {
  componentDidMount() {
    const { onLoadWorksList, worksCount, worksLoading } = this.props;

    if (worksCount === null && !worksLoading) onLoadWorksList();
  }

  render() {
    const { location, worksLoadedIds } = this.props;

    return (
      <WorkItem
        workId={
          isBrowser && worksLoadedIds.length > 0 && location.search === ""
            ? worksLoadedIds[0]
            : location.search.substring(1)
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  worksCount: makeSelectWorksCount(),
  worksLoading: makeSelectWorksLoading(),
  worksLoadedIds: makeSelectWorksIdList(),
});

const mapDispatchToProps = {
  onLoadWorksList: () => loadWorksList(),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Works));
