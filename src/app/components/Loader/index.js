import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import SkewLoader from "react-spinners/SkewLoader";

const useStyles = makeStyles({
  loaderWrapper: ({ isManagement }) => ({
    position: "relative",
    height: "100%",
    width: "100%",
    left: isManagement || isMobile ? "45%" : "calc(100% - (250px + 43%))",
    top: isManagement || isMobile ? "45%" : "calc(100% - (124px + 43%))",
  }),
});

const Loader = ({ location }) => {
  const isManagement = location.pathname === "/management";
  const classes = useStyles({ isManagement });

  return (
    <div className={classes.loaderWrapper}>
      <SkewLoader size={16} />
    </div>
  );
};

Loader.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Loader);
