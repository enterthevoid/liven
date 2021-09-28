import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Material
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

// Styles

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

const ImagePicker = (props) => {
  const { onChange } = props;
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

// Props

ImagePicker.propTypes = {
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default ImagePicker;
