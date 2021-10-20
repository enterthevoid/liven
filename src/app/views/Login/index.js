import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { login } from "../../../redux/auth/actions";
import { makeSelectAuthChecked } from "../../../redux/auth/selectors";
import { checkEmail, usePrevious } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  login: { width: "100%", height: "100vh" },
  textField: { width: 300, marginTop: theme.spacing(2) },
  button: { marginTop: theme.spacing(3) },
}));

const LoginPage = ({ authChecked, onLogin, history, location }) => {
  const [loginData, setLoginData] = useState({ user: {}, errors: {} });
  const prevAuthChecked = usePrevious(authChecked);
  const classes = useStyles();

  const isLogin = location.pathname === "/login";
  const { errors, user } = loginData;

  const onKeyPressed = (e) => {
    if (e.keyCode === 13 && isLogin) {
      handleSubmit();
      document.removeEventListener("keydown", (e) => onKeyPressed(e));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => onKeyPressed(e));

    return () => {
      document.removeEventListener("keydown", (e) => onKeyPressed(e));
    };
  }, []);

  useEffect(() => {
    if (!prevAuthChecked && authChecked) {
      history.push("/management");
    }
  });

  const validate = () => {
    const REQUIRED = ["email", "password"];
    const isOutOfBounds = (s) => !s || s.length < 2;

    let currErrors = errors;

    REQUIRED.forEach((prop) => {
      if (
        prop === "email" &&
        !checkEmail(user[prop]) &&
        !isOutOfBounds(user[prop])
      ) {
        currErrors[prop] = "This email is not valid.";
      }
      if (isOutOfBounds(user[prop])) {
        currErrors[prop] = "This field is required.";
      }
    });

    setLoginData({ ...loginData, errors: currErrors });
    return Object.keys(currErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onLogin(user);
  };

  const handleChange = (prop, data) => {
    let currUser = user;
    let currErrors = errors;

    delete currErrors[prop];
    currUser[prop] = data;

    setLoginData({ user: currUser, errors: currErrors });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className={classes.login}
    >
      <Box display="flex" flexDirection="column">
        <TextField
          label="E-mail address"
          variant="outlined"
          type="email"
          className={classes.textField}
          error={!!errors?.email}
          onChange={(e) => handleChange("email", e.target.value)}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          className={classes.textField}
          error={!!errors?.password}
          onChange={(e) => handleChange("password", e.target.value)}
          helperText={errors.password}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

LoginPage.propTypes = {
  authChecked: PropTypes.bool,
  onLogin: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authChecked: makeSelectAuthChecked(),
});

const mapDispatchToProps = {
  onLogin: (credentials) => login(credentials),
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
