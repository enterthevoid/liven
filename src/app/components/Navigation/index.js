import React from "react";
import { NavLink, withRouter } from "react-router-dom";

// Constants
import { themes } from "../../../utils/constants";

// Styles
import "./styles.scss";

const Navigation = ({ worksList, triggerSwitchTheme, isDark, location }) => {
  return (
    <div className={`navbar-wrapper ${isDark ? "dark" : ""}`}>
      {!!worksList && (
        <React.Fragment>
          <h3 className={`navbar__item ${isDark ? "dark" : ""}`}>Works</h3>
          {Object.values(worksList)?.map((navItem) => {
            const { name, id } = navItem;

            return (
              <NavLink
                key={id}
                className={`navbar__sub-item navbar__item ${
                  isDark ? "dark" : ""
                }`}
                activeClassName={` 
                ${
                  id === location.search.substring(1)
                    ? "navbar__item--active"
                    : ""
                }
                
                
                ${isDark ? "dark" : ""}`}
                to={`works?${id}`}
                title={name}
                onClick={() => triggerSwitchTheme(themes.LIGHT)}
              >
                {name}
              </NavLink>
            );
          })}
        </React.Fragment>
      )}
      <NavLink
        className={`navbar__item ${isDark ? "dark" : ""}`}
        activeClassName={`navbar__item navbar__item--active ${
          isDark ? "dark" : ""
        }`}
        to="about"
        title="About"
        onClick={() => triggerSwitchTheme(themes.DARK)}
      >
        About
      </NavLink>
    </div>
  );
};

export default withRouter(Navigation);
