import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { isBrowser, isMobile } from "react-device-detect";

// Constants
import { themes } from "../../../utils/constants";

// Styles
import "./styles.scss";

const Navigation = (props) => {
  const { worksList, triggerSwitchTheme, isDark, location, authChecked } =
    props;
  const setDark = isDark ? "dark" : "";

  return (
    <div className={`navbar-wrapper${isMobile ? "--mobile" : ""} ${setDark}`}>
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
};

// Props
Navigation.propTypes = {
  worksList: PropTypes.array,
  triggerSwitchTheme: PropTypes.func,
  isDark: PropTypes.bool,
  location: PropTypes.object,
  authChecked: PropTypes.bool,
};

export default withRouter(Navigation);
