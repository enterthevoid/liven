import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import TouchCarousel from "react-touch-carousel";
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";
import Linkify from "react-linkify";
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
    fontSize: 18,
    fontWeight: 500,
    textDecoration: "none",
    padding: theme.spacing(1),
    color: theme.palette.grey[900],
    margin: 0,
    borderRadius: 4,
  },
  carouselCard: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    overflowY: "hidden",
    userSelect: "none",
  },
  descriptionWrapper: ({ downMediumScreen }) => ({
    display: "table",
    tableLayout: "fixed",
    width: downMediumScreen ? "80%" : "60%",
    height: "100%",
    "&  p": {
      alignSelf: "center",
      display: "table-cell",
      verticalAlign: "middle",
      overflowWrap: "break-word",
      "& a": {
        color: "black",
        fontStyle: "italic",
      },
    },
  }),
}));

const WorkItem = ({ work, workLinks }) => {
  const { innerHeight, downMediumScreen } = useWindowDimensions();
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles({ downMediumScreen });
  const carouselHeight = innerHeight - 168;
  // TODO Move card size to variables
  const cardSize = downMediumScreen ? innerWidth : innerWidth - 464;
  const history = useHistory();
  const photosCount =
    work !== undefined && Object.values(work?.photos)?.length + 1;
  const carousel = useRef({
    next: () => null,
    prev: () => null,
  });

  const turnOffLoading = () => {
    // TODO Temporary solution to avoid scrolling issue after change workItem on decktop
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
              <div
                key={workId}
                className={classes.workLinkItem}
                onClick={() =>
                  history.push({ pathname: "works", search: workId })
                }
              >
                {name}
              </div>
            );
          })}
      </Box>
    );
  }

  const addLineBreaks = (string) =>
    string.split("\\n").map((text, index) => (
      <React.Fragment key={`${text}-${index}`}>
        {text}
        <br />
      </React.Fragment>
    ));

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
          const isDesc = photosCount === modIndex + 1;

          return (
            <Box
              key={modIndex}
              display="flex"
              justifyContent={isDesc ? "center" : "flex-end"}
              alignitems="center"
              className={classes.carouselCard}
              style={{
                height: carouselHeight,
                flex: `0 0 ${cardSize}px`,
              }}
            >
              {isDesc ? (
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a target="blank" href={decoratedHref} key={key}>
                      {decoratedText}
                    </a>
                  )}
                >
                  <div className={classes.descriptionWrapper}>
                    <p>{addLineBreaks(work?.description)}</p>
                  </div>
                </Linkify>
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
