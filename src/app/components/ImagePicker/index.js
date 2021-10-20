import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const ImagePicker = ({ onChange }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => onChange(e.target.files)}
      />
      <label htmlFor="contained-button-file">
        <Button
          startIcon={<PhotoCamera />}
          variant="contained"
          color="primary"
          component="span"
        >
          Add Image
        </Button>
      </label>
    </Fragment>
  );
};

ImagePicker.propTypes = {
  onChange: PropTypes.func,
};

export default ImagePicker;
