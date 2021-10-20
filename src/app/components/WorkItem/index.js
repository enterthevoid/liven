import React, { Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile, isDesktop } from "react-device-detect";
import { NavLink, withRouter } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TouchCarousel from "react-touch-carousel";
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigatePrevIcon from "@material-ui/icons/NavigateBefore";
import { makeSelectWorkById } from "../../../redux/works/selectors";
import NonPassiveTouchTarget from "../NonPassiveTouchTarget";
import Loader from "../Loader";
import placeholder from "../../../assets/placeholder.png";
import { useEventListener } from "../../../utils/helpers";
import "react-lazy-load-image-component/src/effects/blur.css";

const bdefStyle = {
  position: "absolute",
  top: "calc(50% - 0.5rem)",
  zIndex: 1,
};
const windowWidth = window.innerWidth;

const useStyles = makeStyles((theme) => ({
  workItemWrapper: {
    height: "inherit",
  },
  prevButton: { left: 16, ...bdefStyle },
  nextButton: { right: 16, ...bdefStyle },
  workLinkItem: {
    fontSize: 16,
    fontWeight: 500,
    textDecoration: "none",
    padding: theme.spacing(1),
    color: theme.palette.grey[900],
    margin: 0,
    marginBottom: theme.spacing(1),
    borderRadius: 4,
  },
  workLinksWrapper: {
    padding: theme.spacing(2),
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  carouselContainer: {
    position: "relative",
    width: "100%",
    margin: "0 auto",
    overflow: "hidden",
    touchAction: "pan-y",
  },
  carouselTrack: {
    display: "flex",
    height: "100%",
  },
  carouselCard: {
    flex: `0 0 ${isMobile ? windowWidth : windowWidth - 250}px`,
    overflow: "hidden",
    userSelect: "none",
    "&  p": {
      alignSelf: "center",
    },
  },
  LazyLoadWrapper: {
    textAlign: "center",
  },
  carouselCardInner: {
    height: window.innerHeight - (isMobile ? 224 : 168),
    width: "92%",
    objectFit: "contain",
  },
  carouselPaginationWrapper: {
    pointerEvents: "none",
    userSelect: "none",
  },
  carouselPagination: {
    padding: theme.spacing(3),
    margin: 0,
  },
}));

const WorkItem = ({ work, workLinks }) => {
  const classes = useStyles({ isDesktop });
  const cardSize = isMobile ? windowWidth : windowWidth - 250;
  const cardPadCount = 1;
  const photosCount =
    work !== undefined && Object.values(work?.photos)?.length + 1;
  const carousel = useRef({
    next: () => null,
    prev: () => null,
  });

  useEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
      carousel && carousel.current.next();
    }
    if (e.code === "ArrowLeft") {
      carousel && carousel.current.prev();
    }
  });

  const CarouselContainer = (props) => {
    const { cursor, carouselState, ...rest } = props;

    let current = -Math.round(cursor) % photosCount;
    while (current < 0) {
      current += photosCount;
    }
    const translateX = (cursor - cardPadCount) * cardSize;

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
          {isDesktop && (
            <Fragment>
              <IconButton
                className={classes.prevButton}
                aria-label="prev"
                onClick={() => carousel && carousel.current.prev()}
              >
                <NavigatePrevIcon />
              </IconButton>

              <IconButton
                className={classes.nextButton}
                aria-label="next"
                onClick={() => carousel && carousel.current.next()}
              >
                <NavigateNextIcon />
              </IconButton>
            </Fragment>
          )}
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
            {current + 1} / {photosCount} {work.name}
          </p>
        </Box>
      </Box>
    );
  };

  if (!!work?.id) {
    return (
      <TouchCarousel
        component={touchWithMouseHOC(CarouselContainer)}
        cardSize={cardSize}
        loop
        cardCount={photosCount}
        cardPadCount={1}
        ref={carousel}
        renderCard={(index, modIndex) => {
          const item = work?.photos[modIndex];

          return (
            <Box
              key={index}
              display="flex"
              justifyContent="center"
              alignitems="center"
              className={classes.carouselCard}
            >
              {photosCount === index + 1 ? (
                <p>{work?.description}</p>
              ) : (
                <LazyLoadImage
                  effect="blur"
                  placeholderSrc={item?.img}
                  className={classes.carouselCardInner}
                  wrapperClassName={classes.LazyLoadWrapper}
                  src={item?.img || ""}
                  alt="liven_img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholder;
                  }}
                />
              )}
            </Box>
          );
        }}
      />
    );
  }

  if (isMobile && !work?.id) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        className={classes.workLinksWrapper}
      >
        {workLinks !== undefined &&
          workLinks.map((navItem) => {
            const { name, workId } = navItem;

            return (
              <NavLink
                key={workId}
                className={classes.workLinkItem}
                to={`works?${workId}`}
                title={name}
              >
                {name}
              </NavLink>
            );
          })}
      </Box>
    );
  }

  return <Loader />;
};

WorkItem.propTypes = {
  work: PropTypes.object,
  workId: PropTypes.string,
  workLinks: PropTypes.array,
  cursor: PropTypes.any,
  carouselState: PropTypes.object,
};

const mapStateToProps = () => {
  const selectWorkById = makeSelectWorkById();

  return (state, props) => ({
    work: selectWorkById(state, props.workId),
  });
};

export default withRouter(connect(mapStateToProps, null)(WorkItem));
