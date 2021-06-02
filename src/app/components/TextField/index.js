import React from "react";

// Styles
import "./styles.scss";

const TextField = (props) => {
  const {
    id,
    className,
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
    <div className={`input-wrapper ${className ? className : ""}`}>
      {label && (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          style={{ minHeight: "200px", border: "2px solid rgb(0 0 0)" }}
          className={`input ${isError ? "input--error" : ""}`}
          type={type ? inputType : "text"}
          id={id}
          name={label ? label.toLowerCase() : ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
        />
      ) : (
        <input
          className={`input ${isError ? "input--error" : ""}`}
          type={type ? inputType : "text"}
          id={id}
          name={label ? label.toLowerCase() : ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
        />
      )}

      <span className="input__error-message">{isError || "  "}</span>
    </div>
  );
};

export default TextField;
