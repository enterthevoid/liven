import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { loadWorksList } from "../../../redux/works/actions";
import { checkAuth, checkAuthFailure } from "../../../redux/auth/actions";
import {
  makeSelectWorksList,
  makeSelectWorksCount,
} from "../../../redux/works/selectors";
import { makeSelectAuthChecked } from "../../../redux/auth/selectors";
import Navigation from "../../components/Navigation";
import NotFound from "../../components/NotFound";
import Works from "../Works";
import About from "../About";
import Login from "../Login";
import Management from "../Management";
import { themes } from "../../../utils/constants";
import { usePrevious } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  app: (props) => {
    const { isDarkTheme } = props;
    const white = theme.palette.grey[50];
    const black = theme.palette.grey[900];

    return {
      height: "100vh",
      overflow: "hidden",
      userSelect: "none",
      backgroundColor: isDarkTheme ? black : white,
      color: isDarkTheme ? white : black,
    };
  },
  heading: (props) => ({
    height: 124,
    userSelect: "none",
    justifyContent: props.isManagement ? "space-between" : "flex-end",
    "& h1": {
      fontSize: 24,
      padding: theme.spacing(5),
      margin: 0,
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      padding: "theme.spacing(3) !important",
      height: "auto !important",
      "& h1": {
        textAlign: "center",
        fontSize: "14px !important",
      },
    },
  }),
  burgerMenu: {
    height: 42,
    width: 42,
    margin: theme.spacing(3),
    alignSelf: "center",
  },
  content: (props) => ({
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    width: "100%",
    overflow: "hidden",
    height: props.isManagement ? "inherit" : "100%",
  }),
  page: (props) => ({
    height: "100%",
    width: "100%",
    padding: props.isManagement ? "4px 16px 16px 16px" : "auto",
  }),
}));

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

  const classes = useStyles({ isDarkTheme, isManagement });
  const prevLocation = usePrevious(location);

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
  });

  const onSwitchTheme = (themeType) => {
    if (!isDarkTheme && themeType === themes.LIGHT) {
      return null;
    } else if (isDarkTheme && themeType === themes.DARK) {
      return null;
    } else {
      setToogleAppTheme(themeType);
    }
  };

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
      <Box className={classes.app} display="flex" flexDirection="column">
        {!isLogin && (
          <Box
            display="flex"
            justifyContent="flex-end"
            className={classes.heading}
          >
            {isManagement && (
              <IconButton
                className={classes.burgerMenu}
                onClick={() => setToogleDrawer(!isDrawerOpen)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <h1>Alexandra Liven</h1>
          </Box>
        )}
        <Box display="flex" className={classes.content}>
          {!isLogin && (
            <Navigation
              onLogout={onLogout}
              isDrawerOpen={isDrawerOpen}
              onCloseDrawer={() => setToogleDrawer(false)}
              worksList={Object.values(worksList || [])}
              triggerSwitchTheme={(themeType) => onSwitchTheme(themeType)}
              isDarkTheme={isDarkTheme}
              authChecked={authChecked}
            />
          )}
          <div className={classes.page}>
            <Switch location={location}>{generateRoutes()}</Switch>
          </div>
        </Box>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          rtl={false}
          draggable
        />
      </Box>
    </React.Fragment>
  );
};

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
