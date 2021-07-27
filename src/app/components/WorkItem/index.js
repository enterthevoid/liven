import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import { isMobile, isDesktop } from "react-device-detect";
import { NavLink, withRouter } from "react-router-dom";

// Selectors
import { makeSelectWorkById } from "../../../redux/works/selectors";

// Components
import Button from "../Button";
import Loader from "../Loader";

// Assets
import placeholder from "../../../assets/placeholder.jpg";

// Styles
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.scss";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const WorkItem = (props) => {
  const [currentSlide, changeSelectedItem] = useState(0);
  const [loadedImage, setLoadedImage] = useState(false);

  const { work, location, workId } = props;

  const prevWorkId = usePrevious(workId);

  console.log(prevWorkId, workId, loadedImage);

  useEffect(() => {
    changeSelectedItem(0);
    setLoadedImage(false);

    setTimeout(() => {
      setLoadedImage(true);
    }, 500);
  }, [work]);

  const worksList = useSelector((state) => state.works.worksList);

  const onChangeSelectedItem = (index) => {
    if (index !== currentSlide) {
      changeSelectedItem(index);
    }
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="32"
      viewBox="0 0 24 24"
      width="32"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );

  const mobileClass = isMobile ? "--mobile" : "--desktop";

  const buttonStyles = {
    prev: {
      left: 4,
      transform: "rotate(180deg)",
      position: "absolute",
      top: "46%",
    },
    next: { position: "absolute", top: "47%", right: 4 },
  };

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
    if (!loadedImage) return <Loader />;

    return (
      <div className={`carousel-wrapper${mobileClass}`}>
        <Carousel
          autoPlay={false}
          className={`carousel${mobileClass}`}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          showArrows={!isMobile}
          selectedItem={currentSlide}
          useKeyboardArrows
          swipeable
          onChange={onChangeSelectedItem}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <Button
                onClick={onClickHandler}
                icon={icon}
                styles={buttonStyles.prev}
              />
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <Button
                onClick={onClickHandler}
                styles={buttonStyles.next}
                icon={icon}
              />
            )
          }
        >
          {Object.values(work?.photos)?.map((photo, index) => {
            return (
              <div key={index} className={`slide-item${mobileClass}`}>
                <img
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholder;
                  }}
                  // onLoadCapture={(e) => {
                  //   setLoadedImage(true);
                  // }}
                  className={`carousel-image${mobileClass}`}
                  src={photo?.img || ""}
                  alt={"liven_img"}
                />
              </div>
            );
          })}
          <div className={`slide-item${mobileClass}`}>
            <p className={`description--${isDesktop ? "desktop" : "mobile"}`}>
              {work.description}
            </p>
          </div>
        </Carousel>
        <p style={{ textAlign: "right", paddingRight: isMobile ? 24 : 42 }}>
          {currentSlide + 1} / {Object.values(work?.photos).length + 1}{" "}
          {work.name}
        </p>
      </div>
    );
  }
};

// Props

WorkItem.propTypes = {
  work: PropTypes.object,
  workId: PropTypes.string,
  location: PropTypes.object,
  onToggleTheme: PropTypes.func,
  carouselTheme: PropTypes.string,
};

const mapStateToProps = () => {
  const selectWorkById = makeSelectWorkById();

  return (state, props) => ({
    work: selectWorkById(state, props.workId),
  });
};

export default withRouter(connect(mapStateToProps, null)(WorkItem));
