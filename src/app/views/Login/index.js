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
import TextField from "../../components/TextField";

// Helpers
import { checkEmail } from "../../../utils/helpers";

// Styles
import "./styles.scss";

class LoginPage extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
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
        <div>
          <TextField
            label="E-mail address"
            type="email"
            onChange={(text) => this.handleChange("email", text)}
            isError={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            onChange={(text) => this.handleChange("password", text)}
            isError={errors.password}
          />
          <button
            className="login--form-submit"
            onClick={() => this.handleSubmit()}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  authChecked: PropTypes.bool,
  onLogin: PropTypes.func,
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
