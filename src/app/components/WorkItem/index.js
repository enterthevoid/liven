import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";

// Selectors
import { makeSelectWorkById } from "../../../redux/works/selectors";

// Components
import Button from "../Button";

// Styles
import "./styles.scss";

// Assets
// import { NavIcon } from "../../../assets/navigate.svg";

const WorkItem = (props) => {
  document.addEventListener("keydown", (e) => onKeyPressed(e));

  const [currentSlide, changeSelectedItem] = useState(0);
  const { work } = props;

  const next = () => {
    changeSelectedItem(currentSlide + 1);
  };
  const prev = () => {
    changeSelectedItem(currentSlide - 1);
  };

  const onKeyPressed = (e) => {
    if (!!work) {
      if (e.keyCode === 37) prev();
      if (e.keyCode === 39) next();
    }
  };

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

  if (!!work?.id) {
    return (
      <div className="carousel-wrapper">
        <Carousel
          className="carousel"
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          selectedItem={currentSlide}
          onChange={onChangeSelectedItem}
        >
          {Object.values(work?.photos)?.map((photo, index) => (
            <div key={index}>
              <Button
                styles={{ position: "absolute", top: "40%", right: 0 }}
                onClick={next}
                icon={icon}
              />
              <Button
                onClick={prev}
                icon={icon}
                styles={{
                  left: 0,
                  transform: "rotate(180deg)",
                  position: "absolute",
                  top: "40%",
                }}
              />
              <img
                className="carousel-image"
                src={photo?.img || ""}
                alt={"liven_img"}
              />
            </div>
          ))}
        </Carousel>

        <p>{work.name}</p>
      </div>
    );
  }

  return "try to load them first)";
};

const mapStateToProps = () => {
  const selectWorkById = makeSelectWorkById();

  return (state, props) => ({
    work: selectWorkById(state, props.workId),
  });
};

export default connect(mapStateToProps, null)(WorkItem);
