/**
 *
 * App
 *
 */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

// Material
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// Actions
import { loadWorksList } from "../../../redux/works/actions";
import { checkAuth, checkAuthFailure } from "../../../redux/auth/actions";

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

// Helpers
import { usePrevious } from "../../../utils/helpers";

// Styles
import "./App.scss";

const App = ({
  worksList,
  location,
  authChecked,
  onLogout,
  onLoadWorksList,
  worksCount,
  onCheckAuth,
}) => {
  const [theme, setToogleAppTheme] = useState(themes.LIGHT);
  const [isDrawerOpen, setToogleDrawer] = useState(false);

  const isManagement = location.pathname === "/management";
  const isLogin = location.pathname === "/login";
  const isDarkTheme = theme === themes?.DARK;

  const prevLocation = usePrevious(location);
  const prevTheme = usePrevious(theme);

  useEffect(() => {
    if (location.pathname === "/about" && theme !== themes.DARK) {
      setToogleAppTheme(themes.DARK);
    }

    if (worksCount === null) {
      onLoadWorksList();
    }

    onCheckAuth();
  }, []);

  useEffect(() => {
    if (
      !!prevLocation &&
      prevLocation.pathname === "/management" &&
      !isManagement &&
      isDrawerOpen
    ) {
      setToogleDrawer(false);
    }

    if (
      !!prevTheme &&
      prevTheme !== themes.DARK &&
      location.pathname === "/about"
    ) {
      setToogleAppTheme(themes.DARK);
    }
  });

  const generateRoutes = () => {
    const accessToken = window.localStorage.getItem("accessToken");
    const routes = [];

    routes.push(
      <Route path="/login" component={Login} key="100" />,
      <Route path="/works" component={Works} key="101" />,
      <Route path="/about" component={About} key="102" />,
      <Redirect exact path="/" to="/works" key="103" />,
      <Route path="*" component={NotFound} key="104" />,

      !accessToken && !authChecked
        ? routes.push(<Redirect path="/management" to="/works" key="105" />)
        : routes.push(
            <Redirect path="/login" to="/management" key="106" />,
            <Route path="/management" component={Management} key="107" />
          )
    );

    return routes;
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Alexandra Liven</title>
        <meta name="description" content="Liven" />
      </Helmet>
      <div className={`app ${isDarkTheme ? "dark" : ""}`}>
        {!isLogin && (
          <div
            className={`app--heading${isMobile ? "--mobile" : ""}`}
            style={isManagement ? { justifyContent: "space-between" } : {}}
          >
            {isManagement && (
              <IconButton
                style={{
                  height: 42,
                  width: 42,
                  margin: 24,
                  alignSelf: "center",
                }} //TODO: Move inline styles to css file
                onClick={() => setToogleDrawer(!isDrawerOpen)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <h1>Alexandra Liven</h1>
          </div>
        )}
        <div
          className={`app--content${isMobile ? "--mobile" : ""}`}
          style={isManagement ? { height: "inherit" } : {}} //TODO: Move inline styles to css file
        >
          {!isLogin && (
            <Navigation
              onLogout={onLogout}
              isDrawerOpen={isDrawerOpen}
              onCloseDrawer={() => setToogleDrawer(false)}
              worksList={Object.values(worksList || [])}
              triggerSwitchTheme={(themeType) => setToogleAppTheme(themeType)}
              isDarkTheme={isDarkTheme}
              authChecked={authChecked}
            />
          )}
          <div
            className="app--content--page"
            style={isManagement ? { padding: 16, paddingTop: 4 } : {}} //TODO: Move inline styles to css file
          >
            <Switch location={location}>{generateRoutes()}</Switch>
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
};

// Props

App.propTypes = {
  worksList: PropTypes.object,
  worksCount: PropTypes.number,
  location: PropTypes.object,
  authChecked: PropTypes.bool,
  onLoadWorksList: PropTypes.func,
  onCheckAuth: PropTypes.func,
  onLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  worksList: makeSelectWorksList(),
  worksCount: makeSelectWorksCount(),
  authChecked: makeSelectAuthChecked(),
});

const mapDispatchToProps = {
  onLoadWorksList: () => loadWorksList(),
  onCheckAuth: () => checkAuth(),
  onLogout: () => checkAuthFailure(),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
