import React from "react";
import PropTypes from "prop-types";

// Styles
import "./styles.scss";

const Icon = (props) => {
  const { size, color, icon, className, style, onClick } = props;

  return icon;

  // return (
  //   <svg
  //     className={`
  //       icon icon--${size || "lg"}
  //       color--${color || "current"}
  //       ${className || ""}
  //     `}
  //     style={style}
  //     xmlns="http://www.w3.org/2000/svg"
  //     xmlnsXlink="http://www.w3.org/1999/xlink"
  //     onClick={onClick}
  //   >
  //     {/* <use xlinkHref={`#${icon}`} /> */}
  //     {icon}
  //   </svg>
  // );
};
// TODO: REFACTOR THIS

// Props

Icon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Icon;
