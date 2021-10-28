import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import NonPassiveTouchTarget from "../NonPassiveTouchTarget";
import { useWindowDimensions } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  workItemWrapper: {
    height: "inherit",
    marginRight: 40,
  },
  carouselContainer: {
    position: "relative",
    overflow: "hidden",
    touchAction: "pan-y",
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
    paddingTop: theme.spacing(2),
    paddingBottom: 40,
    margin: 0,
    color: theme.palette.grey[600],
    fontWeight: 500,
    fontStyle: "italic",
    fontSize: 15,
  },
}));

const CarouselContainer = ({ cursor, carouselState, work, ...rest }) => {
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
  rest: PropTypes.object,
};

export default CarouselContainer;
