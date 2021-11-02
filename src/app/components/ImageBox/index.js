import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { makeStyles } from "@material-ui/core/styles";
import placeholderImage from "../../../assets/placeholder.png";
import Loader from "../Loader";
import { useWindowDimensions } from "../../../utils/helpers";
import "react-lazy-load-image-component/src/effects/blur.css";

const useStyles = makeStyles((theme) => ({
  carouselCardInner: ({ carouselHeight, innerWidth }) => ({
    [theme.breakpoints.down("sm")]: {
      width: "98%",
      maxWidth: "100%",
      position: "inherit",
    },
    height: carouselHeight,
    right: 62,
    position: "absolute",
    width: "fit-content",
    maxWidth: innerWidth - (250 + 40),
    objectFit: "contain",
  }),
}));

const LazyImage = ({ srcLink, carouselHeight }) => {
  const { innerWidth } = useWindowDimensions();
  const classes = useStyles({ carouselHeight, innerWidth });

  return (
    <LazyLoadImage
      effect="blur"
      className={classes.carouselCardInner}
      src={srcLink || ""}
      alt={`liven_img_${srcLink}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholderImage;
      }}
    />
  );
};

LazyImage.propTypes = {
  srcLink: PropTypes.string.isRequired,
  carouselHeight: PropTypes.number,
};

const ImageBox = (props) => {
  const { downMediumScreen } = useWindowDimensions();

  return (
    <Suspense fallback={downMediumScreen ? <div /> : <Loader />}>
      <LazyImage {...props} />
    </Suspense>
  );
};

ImageBox.propTypes = {
  srcLink: PropTypes.string,
  carouselHeight: PropTypes.number,
};

export default ImageBox;
