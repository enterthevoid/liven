import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

// Actions
import { login } from "../../../redux/auth/actions";

// Selectors
import { makeSelectAuthChecked } from "../../../redux/auth/selectors";

// Components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

// Helpers
import { checkEmail } from "../../../utils/helpers";

// Styles
import "./styles.scss";

class LoginPage extends React.Component {
  state = {
    user: {},
    errors: {},
  };

  componentDidMount() {
    document.addEventListener("keydown", (e) => this.onKeyPressed(e));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this.onKeyPressed(e));
  }

  componentDidUpdate(prevState, prevProps) {
    const { authChecked, history } = this.props;
    if (!prevProps.authChecked && authChecked) {
      history.push("/management");
    }
  }

  onKeyPressed(e) {
    const { location } = this.props;
    const isLogin = location.pathname === "/login";

    if (e.keyCode === 13 && isLogin) {
      this.handleSubmit();
      document.removeEventListener("keydown", (e) => this.onKeyPressed(e));
    }
  }

  validate = () => {
    const { errors, user } = this.state;
    const REQUIRED = ["email", "password"];
    const isOutOfBounds = (s) => !s || s.length < 2;

    REQUIRED.forEach((prop) => {
      if (
        prop === "email" &&
        !checkEmail(user[prop]) &&
        !isOutOfBounds(user[prop])
      ) {
        errors[prop] = "This email is not valid.";
      }
      if (isOutOfBounds(user[prop])) {
        errors[prop] = "This field is required.";
      }
    });

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = () => {
    const { onLogin } = this.props;
    const { user } = this.state;

    if (this.validate()) {
      onLogin(user);
    }
  };

  handleChange = (prop, data) => {
    const { errors, user } = this.state;
    delete errors[prop];
    user[prop] = data;

    this.setState({ errors, user });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <Box display="flex" flexDirection="column">
          <TextField
            id="email"
            label="E-mail address"
            variant="outlined"
            type="email"
            error={!!errors?.email}
            onChange={(e) => this.handleChange("email", e.target.value)}
            helperText={errors.email}
            style={{ width: 300, marginTop: 16 }} //TODO: Move inline styles to css
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            error={!!errors?.password}
            onChange={(e) => this.handleChange("password", e.target.value)}
            helperText={errors.password}
            style={{ width: 300, marginTop: 16 }} //TODO: Move inline styles to css
          />
          <Button
            className="login--form-submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 24 }} //TODO: Move inline styles to css
            onClick={() => this.handleSubmit()}
          >
            Login
          </Button>
        </Box>
      </div>
    );
  }
}

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
