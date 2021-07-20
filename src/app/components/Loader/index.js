import React from "react";
import { isDesktop } from "react-device-detect";
import SkewLoader from "react-spinners/SkewLoader";

// Styles
import "./styles.scss";

const Loader = () => (
  <div className="loader-wrapper">
    <SkewLoader size={24} style={{ paddingTop: isDesktop ? 0 : "32%" }} />
  </div>
);

export default Loader;
