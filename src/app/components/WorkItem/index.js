import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { NavLink, withRouter } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TouchCarousel from "react-touch-carousel";
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { makeSelectWorkById } from "../../../redux/works/selectors";
import Loader from "../Loader";
import CarouselContainer from "../CarouselContainer";
import placeholder from "../../../assets/placeholder.png";
import { useEventListener } from "../../../utils/helpers";
import "react-lazy-load-image-component/src/effects/blur.css";

const windowWidth = window.innerWidth;

const useStyles = makeStyles((theme) => {
  const carouselHeight = window.innerHeight - (isMobile ? 224 : 168);

  return {
    workLinksWrapper: {
      padding: theme.spacing(2),
      width: "100%",
      height: "100%",
      overflowY: "auto",
    },
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
    carouselCard: {
      flex: `0 0 ${isMobile ? windowWidth : windowWidth - 252}px`,
      height: carouselHeight,
      overflowY: "auto",
      userSelect: "none",
    },
    descriptionWrapper: {
      display: "table",
      tableLayout: "fixed",
      width: isMobile ? "80%" : "60%",
      "&  p": {
        padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
        alignSelf: isMobile ? "auto" : "center",
        display: "table-cell",
        verticalAlign: "middle",
      },
    },
    LazyLoadWrapper: {
      textAlign: "center",
    },
    carouselCardInner: {
      height: carouselHeight,
      width: "92%",
      objectFit: "contain",
    },
  };
});

const WorkItem = ({ work, workLinks }) => {
  const classes = useStyles();
  const cardSize = isMobile ? windowWidth : windowWidth - 250;
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

  if (!!work?.id) {
    return (
      <TouchCarousel
        component={touchWithMouseHOC(CarouselContainer)}
        cardSize={cardSize}
        cardCount={photosCount}
        cardPadCount={1}
        work={work}
        ref={carousel}
        onClickPrev={() => carousel && carousel.current.prev()}
        onClickNext={() => carousel && carousel.current.next()}
        loop
        renderCard={(index, modIndex) => {
          const item = work?.photos[modIndex];

          return (
            <Box
              key={modIndex}
              display="flex"
              justifyContent="center"
              alignitems="center"
              className={classes.carouselCard}
            >
              {photosCount === modIndex + 1 ? (
                <div className={classes.descriptionWrapper}>
                  <p>{work?.description}</p>
                </div>
              ) : (
                <LazyLoadImage
                  effect="blur"
                  className={classes.carouselCardInner}
                  wrapperClassName={classes.LazyLoadWrapper}
                  src={item?.img || ""}
                  alt={`liven_img_${modIndex}`}
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

  return <Loader />;
};

WorkItem.propTypes = {
  work: PropTypes.object,
  workId: PropTypes.string,
  workLinks: PropTypes.array,
  theme: PropTypes.object,
};

const mapStateToProps = () => {
  const selectWorkById = makeSelectWorkById();

  return (state, props) => ({
    work: selectWorkById(state, props.workId),
  });
};

export default withRouter(connect(mapStateToProps, null)(WorkItem));
