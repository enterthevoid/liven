/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  aboutWrapper: () => {
    const white = theme.palette.grey[50];
    const whiteLigth = "#bdbdbd";

    return {
      height: "100%",
      fontFamily: "Source Serif Pro",
      "& h1": {
        fontSize: 18,
        fontWeight: 300,
        textAlign: "justify",
        lineHeight: 1.4,
        color: whiteLigth,
        margin: theme.spacing(1),
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
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "92%",
    },
  },
  contactsWrapper: {
    paddingTop: theme.spacing(4),
    width: "100%",
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.aboutWrapper}
    >
      <Box
        display="flex"
        flexDirection="column"
        className={classes.aboutContent}
      >
        <h1>
          Hi, I’m <span>Alexandra Liven (Stets)</span> media artist which mostly
          work with
          <span> photography and design</span>.<span> Contributor</span> of
          Stocksy United.<span> Based</span> in Uzhhorod, Ukraine. 14.12.1995
          borned in Korosten’, Zhytomir region, Ukraine.{" "}
          <span> Exhibition </span>
          2018 - solo exhibition Offline Gallery. Uzhhorod. UA 2018 -
          participant of the exhibition PhotoKyiv. “Phragmentation”. Kyiv. UA
          2019 - participant of the exhibition “Intro” in Ilko Gallery.
          Uzhhorod. UA 2019 - partisipant of the exhibition “Intro” in Museum of
          contemporary Ukrainian art. Lytsk.UA 2020 - participant of exhibition
          “Tell me about silence” ILKO Gallery.Uzhhorod.UA
          <span> Resident</span> in project by CCI and Sorry, room no available,
          Dream Doc 2020.
          <span> Published in</span> book by Periscop.ua ‘Alternative
          Archeology’ .
        </h1>
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.contactsWrapper}
        >
          <Box display="flex" flexDirection="column">
            <h1>
              <span>Contact</span>
            </h1>
            <h1>+380994300820</h1>
          </Box>
          <Box display="flex" flexDirection="column">
            <h1>
              <a href="mailto:lexandraliven@gmail.com">
                lexandraliven@gmail.com
              </a>
            </h1>
            <h1>
              <a
                href="https://www.instagram.com/alexandraliven/"
                target="_blank"
              >
                @alexandraliven
              </a>
            </h1>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
