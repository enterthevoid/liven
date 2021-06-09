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

// Utils
import { checkImage } from "../../../utils/helpers";

// Styles
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
              style={{ maxHeight: 24 }}
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
            let isErr = false;

            return (
              <div
                key={index}
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isErr ? (
                  <h3>No image</h3>
                ) : (
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://scontent.fudj2-1.fna.fbcdn.net/v/t1.6435-9/121314868_1559910897533945_3883595861769649035_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=730e14&_nc_ohc=jWkfchUwCncAX-JKz09&_nc_oc=AQmhsCWNnReU_P1CoBU870vFlzAEO3HqlMwKhMih5Ui_kP9PwMgDgYW8zXU-FH4vNyM&_nc_ht=scontent.fudj2-1.fna&oh=e6c5691db3041f51b3eb41ec8337bb56&oe=60E5B029";
                    }}
                    className={`carousel-image${mobileClass}`}
                    src={photo?.img || ""}
                    alt={"liven_img"}
                  />
                )}
              </div>
            );
          })}
        </Carousel>
        <p>
          {currentSlide + 1}/{Object.values(work?.photos).length} {work.name}
        </p>
      </div>
    );
  }

  return <div>No works found</div>;
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
