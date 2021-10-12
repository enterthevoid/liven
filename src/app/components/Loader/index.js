import React from "react";
import PropTypes from "prop-types";
import { isDesktop } from "react-device-detect";
import SkewLoader from "react-spinners/SkewLoader";

// Styles
import "./styles.scss";

const Loader = ({ inputStyles }) => (
  <div
    className={`loader-wrapper ${isDesktop ? "desktop" : "mobile"}`}
    style={inputStyles}
  >
    <SkewLoader size={16} />
  </div>
);

Loader.propTypes = {
  inputStyles: PropTypes.object,
};

export default Loader;
