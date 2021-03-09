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
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Actions
import { loadWorksList } from "../../../redux/works/actions";

// Selectors
import { makeSelectWorksList } from "../../../redux/works/selectors";

// Components
import Navigation from "../../components/Navigation";

// Containers
import Works from "../Works";
import About from "../About";

// Constants
import { themes } from "../../../utils/constants";

// Styles
import "./App.scss";

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

  render() {
    const { worksList, location } = this.props;
    const { theme } = this.state;

    const isDark = theme === themes?.DARK;

    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Alexandra Liven</title>
          <meta name="description" content="Liven" />
        </Helmet>
        <div className={`page-wrapper ${isDark ? "dark" : ""}`}>
          <div className="heading-wrapper">
            <h1>Alexandra Liven</h1>
          </div>
          <div className="flex">
            <Navigation
              worksList={Object.values(worksList)}
              isDark={isDark}
              triggerSwitchTheme={(themeType) =>
                this.setState({ theme: themeType })
              }
            />
            {/* <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="animate"
                timeout={250}
              > */}
            <div className="flex">
              <Switch location={location}>
                <Route exact path="/works" component={Works} />
                <Route exact path="/about" component={About} />
                <Redirect path="/" to="/works" />
              </Switch>
            </div>
            {/* </CSSTransition>
            </TransitionGroup> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// Props

const mapStateToProps = createStructuredSelector({
  worksList: makeSelectWorksList(),
});

const mapDispatchToProps = {
  onLoadWorksList: () => loadWorksList(),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
