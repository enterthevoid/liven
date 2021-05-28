import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

// Selectors
import {
  makeSelectWorksList,
  makeSelectWorksCount,
  makeSelectWorksLoading,
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

    if (worksCount === 0 && !worksLoading) onLoadWorksList();
  }

  render() {
    const { worksCount, location } = this.props;

    console.log(worksCount, "worksCount");

    // if (Object.values(worksList)?.length > 0) {
    //   const { photos } = Object.values(worksList)[0];

    //   return "hello";
    // }
    return <WorkItem workId={location.search.substring(1)} />;
  }
}

const mapStateToProps = createStructuredSelector({
  worksCount: makeSelectWorksCount(),
  worksLoading: makeSelectWorksLoading(),
});

const mapDispatchToProps = {
  onLoadWorksList: () => loadWorksList(),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Works));
