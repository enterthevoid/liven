import React from "react";
import SkewLoader from "react-spinners/SkewLoader";

// Styles
import "./styles.scss";

const Loader = () => (
  <div className="loader-wrapper">
    <SkewLoader size={24} />
  </div>
);

export default Loader;
