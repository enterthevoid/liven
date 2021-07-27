/**
 *
 * App
 *
 */
import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

// Actions
import { loadWorksList } from "../../../redux/works/actions";
import { checkAuth } from "../../../redux/auth/actions";

// Selectors
import {
  makeSelectWorksList,
  makeSelectWorksCount,
} from "../../../redux/works/selectors";
import { makeSelectAuthChecked } from "../../../redux/auth/selectors";

// Components
import Navigation from "../../components/Navigation";
import NotFound from "../../components/NotFound";

// Containers
import Works from "../Works";
import About from "../About";
import Login from "../Login";
import Management from "../Management";

// Constants
import { themes } from "../../../utils/constants";

// Styles
import "./App.scss";

Modal.setAppElement("#root");

class App extends React.Component {
  state = {
    theme: themes.LIGHT,
  };

  componentDidMount() {
    const { onLoadWorksList, location, worksCount, onCheckAuth } = this.props;
    const { theme } = this.state;

    if (location.pathname === "/about" && theme !== themes.DARK) {
      this.setState({ theme: themes.DARK });
    }

    if (worksCount === null) {
      onLoadWorksList();
    }

    onCheckAuth();
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;

    if (location.pathname === "/about" && prevState.theme !== themes.DARK) {
      this.setState({ theme: themes.DARK });
    }
  }

  generateRoutes = () => {
    const { authChecked } = this.props;
    const routes = [];

    routes.push(
      <Route exact path="/login" component={Login} key="100" />,
      <Route exact path="/works" component={Works} key="101" />,
      <Route exact path="/about" component={About} key="102" />,
      <Redirect exact path="/" to="/works" key="103" />,
      <Route component={NotFound} key="104" />,

      !authChecked ? (
        <Redirect exact path="/management" to="/works" key="105" />
      ) : undefined
    );

    if (authChecked) {
      routes.push(
        <Redirect exact path="/login" to="/management" key="106" />,
        <Route exact path="/management" component={Management} key="107" />
      );
    }

    return routes;
  };

  render() {
    const { worksList, location, authChecked } = this.props;
    const { theme } = this.state;

    const isDark = theme === themes?.DARK;
    const isLogin = location.pathname === "/login";

    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Alexandra Liven</title>
          <meta name="description" content="Liven" />
        </Helmet>
        <div className={`app ${isDark ? "dark" : ""}`}>
          {!isLogin && (
            <div className={`app--heading${isMobile ? "--mobile" : ""}`}>
              <h1>Alexandra Liven</h1>
            </div>
          )}
          <div className={`app--content${isMobile ? "--mobile" : ""}`}>
            {!isLogin && (
              <Navigation
                worksList={Object.values(worksList || [])}
                triggerSwitchTheme={(themeType) =>
                  this.setState({ theme: themeType })
                }
                isDark={isDark}
                authChecked={authChecked}
              />
            )}
            <div className="app--content--page">
              <Switch location={location}>{this.generateRoutes()}</Switch>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            draggable
          />
        </div>
      </React.Fragment>
    );
  }
}

// Props

App.propTypes = {
  worksList: PropTypes.object,
  worksCount: PropTypes.number,
  isDark: PropTypes.bool,
  location: PropTypes.object,
  authChecked: PropTypes.bool,
  onLoadWorksList: PropTypes.func,
  onCheckAuth: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  worksList: makeSelectWorksList(),
  worksCount: makeSelectWorksCount(),
  authChecked: makeSelectAuthChecked(),
});

const mapDispatchToProps = {
  onLoadWorksList: () => loadWorksList(),
  onCheckAuth: () => checkAuth(),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
