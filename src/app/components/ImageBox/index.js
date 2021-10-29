import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useImage } from "react-image";
import { makeStyles } from "@material-ui/core/styles";
import placeholderImage from "../../../assets/placeholder.png";
import Loader from "../Loader";
import { useWindowDimensions } from "../../../utils/helpers";
import "react-lazy-load-image-component/src/effects/blur.css";

const useStyles = makeStyles((theme) => ({
  carouselCardInner: (carouselHeight) => ({
    [theme.breakpoints.down("sm")]: {
      width: "98%",
      position: "inherit",
    },
    height: carouselHeight,
    right: 62,
    position: "absolute",
    width: "fit-content",
    objectFit: "contain",
  }),
}));

const LazyImage = ({ srcLink, carouselHeight }) => {
  const classes = useStyles(carouselHeight);
  const { src } = useImage({ srcList: [srcLink] });

  return (
    <LazyLoadImage
      effect="blur"
      className={classes.carouselCardInner}
      src={src || ""}
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
  const { innerWidth } = useWindowDimensions();
  const downMediumScreen = innerWidth < 900;
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
