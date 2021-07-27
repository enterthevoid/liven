import React from "react";

// Assets
import NotFoundImage from "../../../assets/404.png";

// Styles
import "./styles.scss";

const NotFound = () => {
  return (
    <div className="not-found-wrappper">
      <img alt="not-found" src={NotFoundImage} />
    </div>
  );
};

export default NotFound;
