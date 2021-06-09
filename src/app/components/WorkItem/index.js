import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { NavLink, withRouter } from "react-router-dom";

// Selectors
import { makeSelectWorkById } from "../../../redux/works/selectors";

// Components
import Button from "../Button";

// Assets
import placeholder from "../../../assets/placeholder.jpg";

// Styles
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.scss";

const WorkItem = (props) => {
  const [currentSlide, changeSelectedItem] = useState(0);
  const { work, location } = props;

  useEffect(() => {
    changeSelectedItem(0);
  }, [work]);

  const worksList = useSelector((state) => state.works.worksList);

  const onChangeSelectedItem = (index) => {
    if (currentSlide !== index) {
      changeSelectedItem(index);
    }
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );

  const mobileClass = isMobile ? "--mobile" : "";

  if (isMobile && !work?.id) {
    return (
      <div className="work-items">
        {Object.values(worksList).map((navItem) => {
          const { name, id } = navItem;

          return (
            <NavLink
              key={id}
              className={`navbar__sub-item navbar__item`}
              activeClassName={` 
          ${
            id === location?.search?.substring(1) ? "navbar__item--active" : ""
          } `}
              to={`works?${id}`}
              title={name}
            >
              {name}
            </NavLink>
          );
        })}
      </div>
    );
  }

  if (!!work?.id) {
    return (
      <div className={`carousel-wrapper${mobileClass}`}>
        <Carousel
          autoFocus
          className={`carousel${mobileClass}`}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          showArrows={!isMobile}
          selectedItem={currentSlide}
          useKeyboardArrows
          swipeable
          onChange={onChangeSelectedItem}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <Button
                onClick={onClickHandler}
                icon={icon}
                styles={{
                  left: 4,
                  transform: "rotate(180deg)",
                  position: "absolute",
                  top: "46%",
                }}
              />
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <Button
                onClick={onClickHandler}
                styles={{ position: "absolute", top: "47%", right: 4 }}
                icon={icon}
              />
            )
          }
        >
          {Object.values(work?.photos)?.map((photo, index) => {
            return (
              <div key={index} className="slide-item">
                <img
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholder;
                  }}
                  loading={<h3>Loader</h3>}
                  className={`carousel-image${mobileClass}`}
                  src={photo?.img || ""}
                  alt={"liven_img"}
                />
              </div>
            );
          })}
        </Carousel>
        <p>
          {currentSlide + 1} / {Object.values(work?.photos).length} {work.name}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <h3>No works found or loading</h3>
    </div>
  );
};

// Props

WorkItem.propTypes = {
  work: PropTypes.object,
  workId: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = () => {
  const selectWorkById = makeSelectWorkById();

  return (state, props) => ({
    work: selectWorkById(state, props.workId),
  });
};

export default withRouter(connect(mapStateToProps, null)(WorkItem));
