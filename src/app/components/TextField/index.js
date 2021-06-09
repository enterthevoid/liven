import React from "react";
import PropTypes from "prop-types";

// Styles
import "./styles.scss";

const TextField = (props) => {
  const {
    id,
    className = "",
    label,
    value,
    type,
    placeholder,
    onChange,
    isError,
    disabled,
    autoFocus,
  } = props;
  const inputType = type === "email" ? "text" : type;

  return (
    <div className={`input--wrapper ${className}`}>
      {label && (
        <label className="input--label" htmlFor={id}>
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          style={{ minHeight: "200px", border: "2px solid rgb(0 0 0)" }}
          className={`input ${!!isError ? "input--error" : ""}`}
          type={type ? inputType : "text"}
          id={id || inputType}
          name={label ? label.toLowerCase() : ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
        />
      ) : (
        <input
          className={`input ${!!isError ? "input--error" : ""}`}
          type={type ? inputType : "text"}
          id={id || inputType}
          name={label ? label.toLowerCase() : ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
        />
      )}

      <span className="input--error--message">{isError || "  "}</span>
    </div>
  );
};

// Props

TextField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isError: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default TextField;
