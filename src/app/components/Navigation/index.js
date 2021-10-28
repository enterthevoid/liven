import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Box from "@material-ui/core/Box";
import { useWindowDimensions } from "../../../utils/helpers";
import { themes } from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({
  navbar: ({ isManagement }) => ({
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      height: "auto",
      width: "auto",
    },
    paddingTop: isManagement ? theme.spacing(5) : 0,
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
    width: 250,
    height: "100%",
    overflowY: "auto",
  }),
  navbarItem: {
    fontSize: 18,
    fontWeight: 700,
    textDecoration: "none",
    padding: theme.spacing(1),
    margin: 0,
    marginBottom: theme.spacing(0.5),
    color: theme.palette.grey[600],
    borderRadius: 4,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 18,
  },
  navbarSubItem: {
    fontWeight: "500 !important",
    marginBottom: "0px !important",
  },
  activeItem: ({ isDarkTheme }) => ({
    color: isDarkTheme ? theme.palette.grey[50] : theme.palette.grey[900],
  }),
  button: {
    margin: theme.spacing(2),
  },
}));

const Navigation = ({
  worksList,
  triggerSwitchTheme,
  isDarkTheme,
  location,
  authChecked,
  isDrawerOpen,
  onCloseDrawer,
  onLogout,
}) => {
  const isManagement = location.pathname === "/management";
  const { innerWidth } = useWindowDimensions();
  const upMediumScreen = innerWidth > 900;
  const classes = useStyles({ isDarkTheme, isManagement });

  const renderNavItem = (title, themeType, pathTo, isActive) => {
    const getActiveClassName = () => {
      if (isActive !== undefined) {
        return isActive ? classes.activeItem : "";
      } else {
        return classes.activeItem;
      }
    };
    const className =
      pathTo !== undefined
        ? clsx(classes.navbarSubItem, classes.navbarItem)
        : classes.navbarItem;
    const to = pathTo || title.toLowerCase();

    return (
      <NavLink
        key={to}
        className={className}
        activeClassName={getActiveClassName()}
        to={to}
        title={title}
        onClick={() => triggerSwitchTheme(themeType)}
      >
        {title}
      </NavLink>
    );
  };

  const content = (
    <Box display="flex" flexDirection="column" className={classes.navbar}>
      {renderNavItem("Works", themes.LIGHT)}
      {upMediumScreen &&
        !!worksList &&
        worksList.map((navItem) => {
          const { name, id } = navItem;
          const isSelected = id === location?.search?.substring(1);

          return renderNavItem(name, themes.LIGHT, `works?${id}`, isSelected);
        })}
      {renderNavItem("About", themes.DARK)}
      {upMediumScreen &&
        authChecked &&
        renderNavItem("Management", themes.LIGHT)}
    </Box>
  );

  if (isManagement) {
    return (
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => onCloseDrawer()}>
        {content}

        <Button
          startIcon={<LogoutIcon />}
          className={classes.button}
          color="secondary"
          onClick={() => {
            onLogout();
            onCloseDrawer();
          }}
        >
          Logout
        </Button>
      </Drawer>
    );
  } else {
    return content;
  }
};

Navigation.propTypes = {
  worksList: PropTypes.array,
  triggerSwitchTheme: PropTypes.func,
  isDarkTheme: PropTypes.bool,
  location: PropTypes.object,
  authChecked: PropTypes.bool,
  isDrawerOpen: PropTypes.bool,
  onCloseDrawer: PropTypes.func,
  onLogout: PropTypes.func,
};

export default withRouter(Navigation);
