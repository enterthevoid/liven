import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import TouchCarousel from "react-touch-carousel";
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { makeSelectWorkById } from "../../../redux/works/selectors";
import Loader from "../Loader";
import CarouselContainer from "../CarouselContainer";
import ImageBox from "../ImageBox";
import { useEventListener, useWindowDimensions } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    overflowY: "auto",
    userSelect: "none",
  },
  descriptionWrapper: ({ downMediumScreen }) => ({
    display: "table",
    tableLayout: "fixed",
    width: downMediumScreen ? "80%" : "60%",
    "&  p": {
      padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
      alignSelf: "center",
      display: "table-cell",
      verticalAlign: "middle",
    },
  }),
}));

const WorkItem = ({ work, workLinks }) => {
  const { innerWidth, innerHeight } = useWindowDimensions();
  const [isLoading, setLoading] = useState(false);
  const downMediumScreen = innerWidth < 900;
  const classes = useStyles({ downMediumScreen });
  const carouselHeight = innerHeight - (downMediumScreen ? 224 : 168);
  const cardSize = downMediumScreen ? innerWidth : innerWidth - 250;
  const photosCount =
    work !== undefined && Object.values(work?.photos)?.length + 1;
  const carousel = useRef({
    next: () => null,
    prev: () => null,
  });

  const turnOffLoading = () => {
    setTimeout(() => setLoading(false), 300);
  };

  useEffect(() => {
    if (!downMediumScreen) {
      setLoading(true);

      if (
        carousel &&
        carousel.current?.state?.cursor &&
        carousel.current.state.cursor !== (0 || 5e-324)
      ) {
        carousel.current?.go(0);
      }

      turnOffLoading();
    }
  }, [work]);

  useEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
      carousel && carousel.current.next();
    }
    if (e.code === "ArrowLeft") {
      carousel && carousel.current.prev();
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  if (downMediumScreen && !work?.id) {
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
        loop
        renderCard={(index, modIndex) => {
          const item = work?.photos[modIndex];

          return (
            <Box
              key={modIndex}
              display="flex"
              justifyContent="flex-end"
              alignitems="center"
              className={classes.carouselCard}
              style={{
                height: carouselHeight,
                flex: `0 0 ${cardSize}px`,
              }}
            >
              {photosCount === modIndex + 1 ? (
                <div className={classes.descriptionWrapper}>
                  <p>{work?.description}</p>
                </div>
              ) : (
                <ImageBox srcLink={item?.img} carouselHeight={carouselHeight} />
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
};

const mapStateToProps = () => {
  const selectWorkById = makeSelectWorkById();

  return (state, props) => ({
    work: selectWorkById(state, props.workId),
  });
};

export default withRouter(connect(mapStateToProps, null)(WorkItem));
