import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import ImagePicker from "../ImagePicker";
import ReordableList from "../ReordableList";

const useStyles = makeStyles((theme) => ({
  workManagement: {
    width: "100%",
  },
  form: {
    padding: theme.spacing(2),
    "& > *": {
      width: 300,
      marginTop: theme.spacing(1),
    },
  },
  imageListWrapper: {
    width: "100%",
    overflow: "auto",
    height: "calc(100vh - 234px)",
    paddingTop: theme.spacing(2),
  },
  imageListPlaceholderWrapper: {
    height: "100%",
  },
  deleteButton: {
    marginLeft: theme.spacing(2),
  },
  heading: {
    padding: theme.spacing(3),
  },
}));

const defaultErr = {
  description: false,
  name: false,
};

const WorkManagement = ({ work, onSubmit, onDelete }) => {
  const [workManagementData, setWorkManagementData] = useState({
    newWork: work,
    errors: defaultErr,
  });
  useEffect(() => {
    setWorkManagementData({ newWork: work, errors: defaultErr });
  }, [work]);
  const { newWork, errors } = workManagementData;

  const validate = () => {
    const REQUIRED = ["name", "description"];
    const isOutOfBounds = (s) => !s || s.length < 2;
    let currErrors = errors;

    REQUIRED.forEach((prop) => {
      if (isOutOfBounds(newWork[prop])) {
        currErrors[prop] = true;
      }
    });

    setWorkManagementData({ newWork, errors: currErrors });
    return !errors.name || !errors.description;
  };

  const handleChange = (prop, data) => {
    let currWork = { ...newWork, [`${prop}`]: data };
    if (prop === "photos") {
      currWork = { ...newWork, photos: [...newWork.photos, ...data] };
    }

    let currErrors = errors;
    if (data.length > 0) {
      currErrors[prop] = false;
    } else {
      currErrors[prop] = true;
    }

    setWorkManagementData({ newWork: currWork, errors: currErrors });
  };
  const handleSubmit = () => {
    if (validate()) {
      onSubmit(newWork);
    }
  };
  const handleDelete = (workId) => {
    onDelete(workId);
  };
  const handleRemoveImage = (item) => {
    let currWork = {
      ...newWork,
      photos: newWork.photos.filter((elem) => {
        if (elem?.type === "image/jpeg") {
          return elem.name !== item.name;
        } else {
          return elem.img !== item.img;
        }
      }),
    };

    setWorkManagementData({ newWork: currWork, errors });
  };
  const handleSort = (sortedItems) => {
    const sortedWork = {
      ...newWork,
      photos: sortedItems,
    };
    setWorkManagementData({ newWork: sortedWork, errors });
  };
  const getHelperText = (isErr) =>
    isErr ? "This field is required and cannot be empty." : " ";
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={classes.workManagement}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.heading}
      >
        <Typography variant="h5" component="p">
          Work Details
        </Typography>

        <div>
          <ImagePicker onChange={(files) => handleChange("photos", files)} />

          {newWork?.id && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.deleteButton}
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(newWork.id)}
            >
              Delete Work
            </Button>
          )}
        </div>
      </Box>
      <Divider />

      <Box display="flex">
        <Box display="flex" flexDirection="column" className={classes.form}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={newWork?.name}
            error={errors.name}
            onChange={(e) => handleChange("name", e.target.value)}
            helperText={getHelperText(errors.name)}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={8}
            value={newWork?.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            helperText={getHelperText(errors.description)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
            disabled={
              isEqual(newWork, work) || errors.name || errors.description
            }
          >
            Save Work
          </Button>
        </Box>

        <div className={classes.imageListWrapper}>
          {newWork?.photos.length > 0 ? (
            <ReordableList
              items={newWork?.photos || []}
              handleRemoveImage={(item) => handleRemoveImage(item)}
              handleSort={(sortedItems) => handleSort(sortedItems)}
            />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={classes.imageListPlaceholderWrapper}
            >
              <p>Add some photos</p>
            </Box>
          )}
        </div>
      </Box>
    </Box>
  );
};

WorkManagement.propTypes = {
  work: PropTypes.object,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default WorkManagement;
