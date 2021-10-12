import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { isBrowser, isMobile } from "react-device-detect";

// Material
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import LogoutIcon from "@material-ui/icons/ExitToApp";

// Constants
import { themes } from "../../../utils/constants";

// Styles
import "./styles.scss";

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
  const setDark = isDarkTheme ? "dark" : "";
  const isManagement = location.pathname === "/management";
  const content = (
    <div
      className={`navbar-wrapper${isMobile ? "--mobile" : ""} ${setDark}`}
      style={isManagement ? { paddingTop: 42 } : {}}
    >
      <NavLink
        className={`navbar__item ${setDark}`}
        activeClassName={`navbar__item navbar__item--active ${setDark}`}
        to="works"
        title="Works"
        onClick={() => triggerSwitchTheme(themes.LIGHT)}
      >
        Works
      </NavLink>

      {!!worksList &&
        isBrowser &&
        worksList.map((navItem) => {
          const { name, id } = navItem;

          return (
            <NavLink
              key={id}
              className={`navbar__sub-item navbar__item ${setDark} ${
                isMobile ? "mobile" : ""
              }`}
              activeClassName={` 
                ${
                  id === location?.search?.substring(1)
                    ? "navbar__item--active"
                    : ""
                } ${setDark}`}
              to={`works?${id}`}
              title={name}
              onClick={() => triggerSwitchTheme(themes.LIGHT)}
            >
              {name}
            </NavLink>
          );
        })}

      <NavLink
        className={`navbar__item ${setDark}`}
        activeClassName={`navbar__item navbar__item--active ${setDark}`}
        to="about"
        title="About"
        onClick={() => triggerSwitchTheme(themes.DARK)}
      >
        About
      </NavLink>
      {authChecked && !isMobile && (
        <NavLink
          className={`navbar__item ${setDark}`}
          activeClassName={`navbar__item navbar__item--active ${setDark}`}
          to="management"
          title="Management"
          onClick={() => triggerSwitchTheme(themes.LIGHT)}
        >
          Management
        </NavLink>
      )}
    </div>
  );

  if (isManagement) {
    return (
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => onCloseDrawer()}>
        {content}

        <Button
          color="secondary"
          style={{ margin: 24 }}
          onClick={() => {
            onLogout();
            onCloseDrawer();
          }}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Drawer>
    );
  } else {
    return content;
  }
};

// Props
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
