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
    width: "fit-content",
    maxWidth: innerWidth - 400,
    objectFit: "contain",
  }),
}));

const ImageBox = ({ srcLink, carouselHeight }) => {
  const { innerWidth } = useWindowDimensions();
  const classes = useStyles({ carouselHeight, innerWidth });

  return (
    <img
      className={classes.carouselCardInner}
      src={srcLink}
      alt={`liven_img_${srcLink}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholderImage;
      }}
    />
  );
};

ImageBox.propTypes = {
  srcLink: PropTypes.string,
  carouselHeight: PropTypes.number,
};

export default ImageBox;
