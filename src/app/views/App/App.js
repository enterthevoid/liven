/**
 *
 * App
 *
 */
import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";
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
      <Route path="/login" component={Login} key="100" />,
      <Route path="/works" component={Works} key="101" />,
      <Route path="/about" component={About} key="102" />,
      <Route path="*" component={NotFound} key="104" />,
      <Redirect path="/" to="/works" key="103" />,

      authChecked
        ? routes.push(
            <Redirect path="/login" to="/management" key="106" />,
            <Route path="/management" component={Management} key="107" />
          )
        : routes.push(<Redirect path="/management" to="/works" key="105" />)
    );

    return routes;
  };

  render() {
    const { worksList, location, authChecked } = this.props;
    const { theme } = this.state;

    const isDark = theme === themes?.DARK;
    const isLogin = location.pathname === "/login";
    const isManagement = location.pathname === "/management";

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
            <div
              className="app--content--page"
              style={isManagement ? { padding: 16 } : {}} //TODO: Move inline styles to css file
            >
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
