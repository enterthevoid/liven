import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import { isMobile, isDesktop } from "react-device-detect";
import { NavLink, withRouter } from "react-router-dom";

// Material
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigatePrevIcon from "@material-ui/icons/NavigateBefore";

// Selectors
import { makeSelectWorkById } from "../../../redux/works/selectors";

// Components
import Loader from "../Loader";

// Assets
import placeholder from "../../../assets/placeholder.jpg";

// Styles
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.scss";

const WorkItem = (props) => {
  const [currentSlide, changeSelectedItem] = useState(0);
  const [loadedImage, setLoadedImage] = useState(false);
  const { work, location } = props;

  useEffect(() => {
    setLoadedImage(false);

    setTimeout(() => {
      changeSelectedItem(0);
      setLoadedImage(true);
    }, 800);
  }, [work]);

  const worksList = useSelector((state) => state.works.worksList);

  const onChangeSelectedItem = (index) => {
    if (index !== currentSlide) {
      changeSelectedItem(index);
    }
  };

  const mobileClass = isMobile ? "--mobile" : "--desktop";

  const buttonStyles = {
    prev: {
      left: 4,
      position: "absolute",
      top: "46%",
      zIndex: 1,
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

    return isMobile ? (
      <div style={{ width: "100vw", overflow: "hidden", paddingBottom: 100 }}>
        {Object.values(work?.photos)?.map((photo, index) => {
          return (
            <div
              key={index}
              style={{
                maxWidth: "100vw",
                padding: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
                style={{ maxWidth: "92vw" }}
                // className={`carousel-image${mobileClass}`}
                src={photo?.img || ""}
                alt={"liven_img"}
              />
            </div>
          );
        })}
        <p
          className={`description--${isDesktop ? "desktop" : "mobile"}`}
          style={{ padding: 16, height: "100%" }}
        >
          {work.description}
        </p>
      </div>
    ) : (
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
              <IconButton
                style={buttonStyles.prev}
                aria-label="prev"
                onClick={onClickHandler}
              >
                <NavigatePrevIcon />
              </IconButton>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <IconButton
                style={buttonStyles.next}
                aria-label="next"
                onClick={onClickHandler}
              >
                <NavigateNextIcon />
              </IconButton>
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

  return <Loader />;
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
