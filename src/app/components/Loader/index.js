import React from "react";
import { isDesktop } from "react-device-detect";
import SkewLoader from "react-spinners/SkewLoader";

// Styles
import "./styles.scss";

const Loader = () => (
  <div
    className="loader-wrapper"
    style={{ marginTop: isDesktop ? "-8%" : "32%" }}
  >
    <SkewLoader size={16} />
  </div>
);

export default Loader;
