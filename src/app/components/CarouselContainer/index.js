import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import IconButton from "@material-ui/core/IconButton";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import NavigatePrevIcon from "@material-ui/icons/NavigateBefore";
import NonPassiveTouchTarget from "../NonPassiveTouchTarget";
import { useWindowDimensions } from "../../../utils/helpers";

const bdefStyle = {
  position: "absolute",
  top: "40%",
  zIndex: 1,
  color: "black",
};
const useStyles = makeStyles((theme) => ({
  workItemWrapper: {
    height: "inherit",
    marginRight: 40,
  },
  prevButton: { left: 16, ...bdefStyle },
  nextButton: { right: 16, ...bdefStyle },
  carouselContainer: {
    position: "relative",
    // margin: "0 auto",
    overflow: "hidden",
    touchAction: "pan-y",
    // paddingRight: 40,
  },
  carouselTrack: {
    display: "flex",
    height: "100%",
  },
  carouselPaginationWrapper: {
    pointerEvents: "none",
    userSelect: "none",
  },
  carouselPagination: {
    // padding: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: 40,
    margin: 0,
    color: theme.palette.grey[600],
    fontWeight: 500,
    fontStyle: "italic",
    fontSize: 15,
  },
}));

const CarouselContainer = ({
  // onClickNext,
  // onClickPrev,
  cursor,
  carouselState,
  work,
  ...rest
}) => {
  const classes = useStyles();
  const { innerWidth } = useWindowDimensions();
  const navBarWidth = 250;
  const downMediumScreen = innerWidth < 900;
  const cardSize = downMediumScreen ? innerWidth : innerWidth - navBarWidth;
  const cardPadCount = 1;
  const currImgCount =
    work !== undefined && Object.values(work?.photos)?.length + 1;

  let current = -Math.round(cursor) % currImgCount;

  while (current < 0) {
    current += currImgCount;
  }

  const translateX = (cursor - cardPadCount) * cardSize - 20;

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={classes.workItemWrapper}
    >
      <NonPassiveTouchTarget
        className={classes.carouselContainer}
        carouselstate={carouselState}
      >
        {/* {!downMediumScreen && (
          <Fragment>
            <IconButton
              className={classes.prevButton}
              aria-label="prev"
              onClick={() => onClickPrev()}
            >
              <NavigatePrevIcon />
            </IconButton>

            <IconButton
              className={classes.nextButton}
              aria-label="next"
              onClick={() => onClickNext()}
            >
              <NavigateNextIcon />
            </IconButton>
          </Fragment>
        )} */}
        <NonPassiveTouchTarget
          className={classes.carouselTrack}
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          {...rest}
        />
      </NonPassiveTouchTarget>
      <Box
        display="flex"
        justifyContent="flex-end"
        className={classes.carouselPaginationWrapper}
      >
        <p className={classes.carouselPagination}>
          {current + 1} / {currImgCount} {work?.name}
        </p>
      </Box>
    </Box>
  );
};

CarouselContainer.propTypes = {
  work: PropTypes.object,
  cursor: PropTypes.any,
  carouselState: PropTypes.object,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
  rest: PropTypes.object,
};

export default CarouselContainer;
