import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import placeholderImage from "../../../assets/placeholder.png";
import { useWindowDimensions } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  carouselCardInner: ({ carouselHeight, innerWidth }) => ({
    [theme.breakpoints.down("sm")]: {
      width: "98%",
      maxWidth: "100%",
      position: "inherit",
    },
    height: carouselHeight,
    position: "absolute",
    width: "initial",
    maxWidth: innerWidth - 464,
    objectFit: "contain",
    overflow: "hidden",
  }),
  imgWrapper: ({ carouselHeight, downMediumScreen }) => ({
    display: "flex",
    justifyContent: downMediumScreen ? "center" : "flex-end",
    width: downMediumScreen ? innerWidth : innerWidth - 464,
    height: carouselHeight,
    position: "absolute",
  }),
}));

const ImageBox = ({ srcLink, carouselHeight }) => {
  const { innerWidth, downMediumScreen } = useWindowDimensions();
  const classes = useStyles({ carouselHeight, innerWidth, downMediumScreen });

  return (
    <div className={classes.imgWrapper}>
      <img
        className={classes.carouselCardInner}
        src={srcLink}
        alt={`liven_img_${srcLink}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImage;
        }}
      />
    </div>
  );
};

ImageBox.propTypes = {
  srcLink: PropTypes.string,
  carouselHeight: PropTypes.number,
};

export default ImageBox;
