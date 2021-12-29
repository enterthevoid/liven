/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useWindowDimensions } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  aboutWrapper: () => {
    const white = theme.palette.grey[50];
    const whiteLigth = "#bdbdbd";
    return {
      fontFamily: "Source Serif Pro",
      lineHeight: 1.4,
      "& h1": {
        [theme.breakpoints.down("sm")]: {
          fontSize: 16,
        },
        fontSize: 18,
        fontWeight: 300,
        color: whiteLigth,
        padding: theme.spacing(1),
        paddingBottom: 0,
        margin: 0,
      },
      "& span": {
        fontStyle: "italic",
        fontWeight: 500,
        color: white,
      },
      "& a": {
        color: "inherit",
      },
    };
  },
  aboutContent: {
    width: "52%",
    [theme.breakpoints.down("sm")]: {
      width: "92%",
    },
  },
  contactsWrapper: {
    paddingTop: theme.spacing(3),
    width: "100%",
  },
}));

const About = () => {
  const classes = useStyles();
  const { innerHeight, downMediumScreen } = useWindowDimensions();
  const headerHeightMobile = 78; // Header + Navigation
  const headerHeight = 108; // Header

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.aboutWrapper}
      style={
        downMediumScreen
          ? { height: innerHeight - headerHeightMobile }
          : { height: innerHeight - headerHeight }
      }
    >
      <Box
        display="flex"
        flexDirection="column"
        className={classes.aboutContent}
      >
        <h1>
          Hi, I’m <span>Alexandra Liven (Stets)</span> media artist, working
          with <span>photography, video and design</span>.{" "}
          <span>Occupation</span> - Uzhhorod, Ukraine. Born 1994/14/12 in
          Korosten’, Zhytomir region, Ukraine. <span>Exhibitions</span> 2018 -
          solo exhibition Offline Gallery. Uzhhorod, UA; 2018 - participant of
          the exhibition PhotoKyiv. “Phragmentation”. Kyiv. UA; 2019 -
          participant of the exhibition “Intro” in Ilko Gallery. Uzhhorod. UA;
          2019 - partisipant of the exhibition “Intro” in Museum of contemporary
          Ukrainian art. Lytsk.UA; 2020 - participant of exhibition ILKO
          Gallery.Uzhhorod, UA; 2020 - participant of the exhibition “Tell me
          about silence” in Ilko Gallery UA. Took part in{" "}
          <span> Dream Doc</span> program with the support of the residence
          "Sorry, room no available" and CCI 2020. <span>Published in</span>{" "}
          book by Was published in a book by Periscop.ua ‘Alternative
          Archeology’.
        </h1>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          className={classes.contactsWrapper}
        >
          <h1>
            <span>Contacts</span>
          </h1>
          <h1>
            <a href="mailto:lexandraliven@gmail.com">lexandraliven@gmail.com</a>
          </h1>
          <h1 className={classes.link}>
            <a href="https://www.instagram.com/alexandraliven/" target="_blank">
              @alexandraliven
            </a>
          </h1>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
