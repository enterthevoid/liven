import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Box from "@material-ui/core/Box";
import {
  useWindowDimensions,
  useEventListener,
  usePrevious,
} from "../../../utils/helpers";
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
  history,
  authChecked,
  isDrawerOpen,
  onCloseDrawer,
  onLogout,
}) => {
  const isManagement = location.pathname === "/management";
  const { innerWidth } = useWindowDimensions();
  const upMediumScreen = innerWidth > 900;
  const classes = useStyles({ isDarkTheme, isManagement });
  const [cursor, setCursor] = useState(1);
  const [pushTo, setPushTo] = useState(null);

  const NavItemsCount = Object.keys(worksList).length;
  const showManagement = upMediumScreen && authChecked;
  const maxCursor = showManagement ? NavItemsCount + 2 : NavItemsCount + 1;
  const prevLocation = usePrevious(location);

  useEventListener("keydown", (e) => {
    if (e.code === "ArrowUp" && cursor !== 1) {
      setCursor(cursor - 1);
    }
    if (e.code === "ArrowDown" && cursor !== maxCursor) {
      setCursor(cursor + 1);
    }

    if (e.code === "Enter" && !!pushTo) {
      if (pushTo === "about") {
        triggerSwitchTheme(themes.DARK);
      } else if (prevLocation?.pathname === "/about" && pushTo !== "about") {
        triggerSwitchTheme(themes.LIGHT);
      }
      history.push(pushTo);
    }
  });

  const allNavItems = [{ name: "Works" }];
  const workNavItems = worksList.map((navItem) => ({
    name: navItem.name,
    id: navItem.id,
  }));
  if (upMediumScreen) {
    allNavItems.push(...workNavItems);
  }
  allNavItems.push({ name: "About" }, { name: "Management" });

  const renderNavItem = (hoverIndex, title, pathTo, isActive) => {
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
    const hovered = cursor === hoverIndex && hoverIndex !== 0;
    const themeType = to === "about" ? themes.DARK : themes.LIGHT;

    if (hovered && pushTo !== to) {
      setPushTo(to);
    }

    if (to === "management" && !showManagement) {
      return null;
    }

    return (
      <NavLink
        key={to}
        style={
          hovered && upMediumScreen ? { textDecoration: "line-through" } : {}
        }
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
      {allNavItems.map((navItem, index) => {
        const { name, id } = navItem;
        const isSelected = id === location?.search?.substring(1);
        const params = [index, name];

        if (id !== undefined) params.push(`works?${id}`, isSelected);

        return renderNavItem(...params);
      })}
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
  history: PropTypes.object,
  authChecked: PropTypes.bool,
  isDrawerOpen: PropTypes.bool,
  onCloseDrawer: PropTypes.func,
  onLogout: PropTypes.func,
};

export default withRouter(Navigation);
