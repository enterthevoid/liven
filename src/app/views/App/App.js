/**
 *
 * App
 *
 */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import Modal from "react-modal";

// Actions
import { loadWorksList } from "../../../redux/works/actions";

// Selectors
import { makeSelectWorksList } from "../../../redux/works/selectors";
import { makeSelectAuth } from "../../../redux/auth/selectors";

// Components
import Navigation from "../../components/Navigation";

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
    const { onLoadWorksList } = this.props;

    onLoadWorksList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;

    if (location.pathname === "/about" && prevState.theme !== themes.DARK) {
      this.setState({ theme: themes.DARK });
    }
  }

  generateRoutes = () => {
    const { auth } = this.props;
    const routes = [];

    routes.push(
      <Route exact path="/login" component={Login} key="100" />,
      <Route exact path="/works" component={Works} key="101" />,
      <Route exact path="/about" component={About} key="102" />
    );

    if (!!auth) {
      routes.push(
        <Route exact path="/management" component={Management} key="103" />,
        <Redirect path="/login" to="/management" key="104" />
      );
    }

    return routes;
  };

  render() {
    const { worksList, location, auth } = this.props;
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
        <div className={`page-wrapper ${isDark ? "dark" : ""}`}>
          {!isLogin && (
            <div className="heading-wrapper">
              <h1>Alexandra Liven</h1>
            </div>
          )}
          <div className="flex">
            {!isLogin && (
              <Navigation
                worksList={Object.values(worksList || [])}
                triggerSwitchTheme={(themeType) =>
                  this.setState({ theme: themeType })
                }
                isDark={isDark}
                auth={auth}
              />
            )}
            {/* <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="animate"
                timeout={250}
              > */}
            <div className="flex">
              <Switch location={location}>{this.generateRoutes()}</Switch>
            </div>
            {/* </CSSTransition>
            </TransitionGroup> */}
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
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

const mapStateToProps = createStructuredSelector({
  worksList: makeSelectWorksList(),
  auth: makeSelectAuth(),
});

const mapDispatchToProps = {
  onLoadWorksList: () => loadWorksList(),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
