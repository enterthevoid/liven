import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { isBrowser } from "react-device-detect";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Box from "@material-ui/core/Box";
import { themes } from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({
  navbar: (props) => ({
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      height: "auto",
      width: "auto",
    },
    paddingTop: props.isManagement ? theme.spacing(5) : 0,
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
    width: 250,
    height: "100%",
    overflowY: "auto",
  }),
  navbarItem: ({ isDarkTheme }) => ({
    fontSize: 16,
    fontWeight: 700,
    textDecoration: "none",
    padding: theme.spacing(1.5),
    margin: 0,
    color: isDarkTheme ? theme.palette.grey[50] : theme.palette.grey[900],
    borderRadius: 4,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 18,
  }),
  navbarSubItem: {
    fontWeight: "500 !important",
    marginBottom: `${theme.spacing(0.5)}px !important`,
  },
  activeItem: {
    textDecoration: "line-through !important",
    fontStyle: "italic",
  },
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
      {isBrowser &&
        !!worksList &&
        worksList.map((navItem) => {
          const { name, id } = navItem;
          const isSelected = id === location?.search?.substring(1);

          return renderNavItem(name, themes.LIGHT, `works?${id}`, isSelected);
        })}
      {renderNavItem("About", themes.DARK)}
      {isBrowser && authChecked && renderNavItem("Management", themes.LIGHT)}
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
