import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  placeholderWrapper: {
    width: "100%",
    height: "100%",
  },
});

const Placeholder = ({ placeholderText }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={classes.placeholderWrapper}
    >
      <h3>{placeholderText}</h3>
    </Box>
  );
};

Placeholder.propTypes = {
  placeholderText: PropTypes.string,
};

export default Placeholder;
