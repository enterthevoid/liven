import React, { useRef, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
/* eslint-disable no-useless-escape */

const checkEmail = (value) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const getWindowDimensions = () => {
  const { innerWidth, innerHeight } = window;
  const downMediumScreen = innerWidth < 900;
  const upMediumScreen = innerWidth > 900;

  return {
    innerWidth,
    innerHeight,
    downMediumScreen,
    upMediumScreen,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

const validateFormik = (values) => {
  const REQUIRED = Object.keys(values);
  const isOutOfBounds = (s) => !s || s.length < 2;
  const currErrors = {};

  REQUIRED.forEach((prop) => {
    if (
      prop === "email" &&
      !checkEmail(values[prop]) &&
      !isOutOfBounds(values[prop])
    ) {
      currErrors[prop] = "This email is not valid.";
    }
    if (isOutOfBounds(values[prop])) {
      currErrors[prop] = "This field is required.";
    }
  });

  return currErrors;
};

const renderFormikTextField = (name, formik) => {
  const { values, errors, handleChange } = formik;
  const field = name.toLowerCase();
  const isMultiline = name === "Description";
  const styles = { width: 300, marginTop: 16 };

  return (
    <TextField
      id={field}
      label={name}
      style={styles}
      type={field || "text"}
      variant="outlined"
      value={values[`${field}`]}
      multiline={isMultiline}
      rows={isMultiline ? 8 : 1}
      error={!!errors[`${field}`]}
      onChange={handleChange}
      helperText={errors[`${field}`] || " "}
    />
  );
};

export {
  checkEmail,
  usePrevious,
  useWindowDimensions,
  getWindowDimensions,
  useEventListener,
  validateFormik,
  renderFormikTextField,
};
