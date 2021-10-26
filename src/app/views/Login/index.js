import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { login } from "../../../redux/auth/actions";
import { makeSelectAuthChecked } from "../../../redux/auth/selectors";
import {
  usePrevious,
  useEventListener,
  validateFormik,
  renderFormikTextField,
} from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  login: { width: "100%", height: "100vh" },
  button: { marginTop: theme.spacing(3) },
}));

const LoginPage = ({ authChecked, onLogin, history, location }) => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => onLogin(values),
    validate: (values) => validateFormik(values),
  });
  const { handleSubmit } = formik;
  const prevAuthChecked = usePrevious(authChecked);
  const classes = useStyles();
  const isLogin = location.pathname === "/login";

  useEventListener("keydown", (e) => {
    if (e.code === "Enter" && isLogin) {
      handleSubmit();
    }
  });

  useEffect(() => {
    if (!prevAuthChecked && authChecked) {
      history.push("/management");
    }
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className={classes.login}
    >
      <Box display="flex" flexDirection="column">
        {renderFormikTextField("Email", formik)}
        {renderFormikTextField("Password", formik)}

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={formik.handleSubmit}
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
