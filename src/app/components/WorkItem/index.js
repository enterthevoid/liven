import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";

// Selectors
import { makeSelectWorkById } from "../../../redux/works/selectors";

// Components
import Button from "../Button";

// Styles
import "./styles.scss";

const WorkItem = (props) => {
  const [currentSlide, changeSelectedItem] = useState(0);
  const { work } = props;

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
          autoFocus
          className="carousel"
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          selectedItem={currentSlide}
          useKeyboardArrows
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
          {Object.values(work?.photos)?.map((photo, index) => (
            <div key={index}>
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

  return null;
};

const mapStateToProps = () => {
  const selectWorkById = makeSelectWorkById();

  return (state, props) => ({
    work: selectWorkById(state, props.workId),
  });
};

export default connect(mapStateToProps, null)(WorkItem);
