import React from "react";
import { isMobile } from "react-device-detect";

// Assets
import NotFoundImage from "../../../assets/404.png";

// Styles
import "./styles.scss";

const NotFound = () => {
  return (
    <div className={`not-found-wrappper  ${isMobile ? "--mobile" : ""}`}>
      <img alt="not-found" src={NotFoundImage} />
    </div>
  );
};

export default NotFound;
