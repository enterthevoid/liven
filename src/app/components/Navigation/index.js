import React from "react";
import PropTypes from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Box from "@material-ui/core/Box";
import { useWindowDimensions } from "../../../utils/helpers";
import { themes } from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({
  navbar: ({ isManagement, upMediumScreen }) => ({
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 0,
      margin: 0,
      height: "auto",
      width: "auto",
    },
    paddingTop: isManagement ? theme.spacing(5) : 0,
    paddingLeft: theme.spacing(5),
    minWidth: upMediumScreen ? 400 : "auto",
    maxWidth: 400,
    height: "100%",
    overflowY: "auto",
  }),
  navbarItem: ({ upMediumScreen }) => ({
    cursor: "pointer",
    lineHeight: 1.4,
    fontSize: 18,
    fontWeight: 700,
    textDecoration: "none",
    color: theme.palette.grey[600],
    borderRadius: 4,
    padding: theme.spacing(1),
    margin: upMediumScreen ? 0 : theme.spacing(2),

    "&:nth-child(1)": {
      marginRight: upMediumScreen ? 0 : theme.spacing(1),
    },

    "&:nth-child(2)": {
      marginLeft: upMediumScreen ? 0 : 0,
    },
  }),
  navbarSubItem: {
    fontWeight: "500 !important",
    marginBottom: "0px !important",
  },
  hoveredItem: { textDecoration: "line-through" },
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
  const { upMediumScreen } = useWindowDimensions();
  const classes = useStyles({ isDarkTheme, isManagement, upMediumScreen });
  const regLinkCheck = (elem) =>
    ["management", "about", "works"].includes((elem || "").toLowerCase());
  const history = useHistory();
  const showManagement = upMediumScreen && authChecked;

  const onRedirect = (pushTo) => {
    if (regLinkCheck(pushTo)) {
      history.push({ pathname: pushTo });
    } else {
      history.push({ pathname: "works", search: pushTo });
    }
  };

  const allNavItems = [{ name: "Works" }];
  const workNavItems = worksList.map((navItem) => ({
    name: navItem.name,
    id: navItem.id,
  }));
  if (upMediumScreen) allNavItems.push(...workNavItems);

  allNavItems.push({ name: "About" }, { name: "Management" });

  const renderNavItem = (hoverIndex, title, pathTo, isActive) => {
    const className =
      pathTo !== undefined
        ? clsx(classes.navbarSubItem, classes.navbarItem)
        : classes.navbarItem;
    const to = regLinkCheck(title) ? title.toLowerCase() : pathTo || "";
    const themeType = to === "about" ? themes.DARK : themes.LIGHT;

    if (to === "management" && !showManagement) {
      return null;
    }

    return (
      <div
        key={hoverIndex}
        className={clsx(
          className,
          isActive && classes.activeItem,
          title.toLowerCase() === location.pathname.substring(1) &&
            classes.activeItem,
          upMediumScreen && classes.hoveredItem
        )}
        onClick={() => {
          onRedirect(pathTo || title.toLowerCase());
          triggerSwitchTheme(themeType);
        }}
      >
        {title}
      </div>
    );
  };

  const content = (
    <Box display="flex" flexDirection="column" className={classes.navbar}>
      {allNavItems.map((navItem, index) => {
        const { name, id } = navItem;
        const isSelected = id === location?.search?.substring(1);
        const params = [index, name];

        if (id !== undefined) params.push(`?${id}`, isSelected);

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
  authChecked: PropTypes.bool,
  isDrawerOpen: PropTypes.bool,
  onCloseDrawer: PropTypes.func,
  onLogout: PropTypes.func,
};

export default withRouter(Navigation);
