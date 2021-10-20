import React from "react";
import { isMobile } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import NotFoundImage from "../../../assets/404.png";

const useStyles = makeStyles((theme) => ({
  notFound: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8vh",
    },
    width: "100%",
    height: "100%",
    "& img": {
      objectFit: "contain",
      height: "80%",
      width: "80%",
    },
  },
}));

const NotFound = () => {
  const classes = useStyles({ isMobile });

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      className={classes.notFound}
    >
      <img alt="not-found" src={NotFoundImage} />
    </Box>
  );
};

export default NotFound;
