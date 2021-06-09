import React from "react";
import PropTypes from "prop-types";

// Styles
import "./styles.scss";

const Button = (props) => {
  const { onClick, label = "", icon, className = "", styles } = props;

  return (
    <button
      style={styles}
      className={`button${!!icon ? "--icon" : ""} ${className}`}
      onClick={onClick}
    >
      {!!icon && icon}
      {label}
    </button>
  );
};

// Props

Button.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  label: PropTypes.string,
  icon: PropTypes.any,
  className: PropTypes.string,
};

export default Button;
