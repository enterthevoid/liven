import React from "react";

// Styles
import "./styles.scss";

const Button = (props) => {
  const { onClick, label = "", icon, className = "", styles } = props;

  return (
    <button
      style={styles}
      className={!!icon ? "button--icon" : className + " button"}
      onClick={onClick}
    >
      {!!icon && icon}
      {label}
    </button>
  );
};

export default Button;
