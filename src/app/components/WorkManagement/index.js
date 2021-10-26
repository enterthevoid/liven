import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import ImagePicker from "../ImagePicker";
import ReordableList from "../ReordableList";
import Placeholder from "../Placeholder";
import { validateFormik, renderFormikTextField } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  workManagement: {
    width: "100%",
  },
  form: {
    padding: theme.spacing(2),
  },
  imageListWrapper: {
    width: "100%",
    overflow: "auto",
    height: "calc(100vh - 234px)",
    paddingTop: theme.spacing(2),
  },
  deleteButton: {
    marginLeft: theme.spacing(2),
  },
  heading: {
    padding: theme.spacing(3),
  },
}));

const WorkManagement = ({ work, onSubmit, onDelete }) => {
  const [currWork, setCurrWork] = useState(work);

  useEffect(() => {
    setCurrWork(work);
  }, [work]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currWork.name || "",
      description: currWork.description || "",
    },
    onSubmit: (values) => {
      const composedWork = { ...currWork, ...values };

      onSubmit(composedWork);
    },
    validate: (values) => validateFormik(values),
  });

  const { errors, handleChange, handleSubmit } = formik;

  const handleDelete = (workId) => {
    onDelete(workId);
  };

  const handleRemoveImage = (item) => {
    let filteredWork = {
      ...currWork,
      photos: currWork.photos.filter((elem) => {
        if (elem?.type === "image/jpeg") {
          return elem.name !== item.name;
        } else {
          return elem.img !== item.img;
        }
      }),
    };

    setCurrWork(filteredWork);
  };

  const handleSort = (sortedItems) => {
    const sortedWork = { ...currWork, photos: sortedItems };

    setCurrWork(sortedWork);
  };

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

          {currWork?.id && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.deleteButton}
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(currWork.id)}
            >
              Delete Work
            </Button>
          )}
        </div>
      </Box>
      <Divider />

      <Box display="flex">
        <Box display="flex" flexDirection="column" className={classes.form}>
          {renderFormikTextField("Name", formik)}
          {renderFormikTextField("Description", formik)}

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
            disabled={!!errors.name || !!errors.description}
          >
            Save Work
          </Button>
        </Box>

        <div className={classes.imageListWrapper}>
          {currWork?.photos.length > 0 ? (
            <ReordableList
              items={currWork?.photos || []}
              handleRemoveImage={(item) => handleRemoveImage(item)}
              handleSort={(sortedItems) => handleSort(sortedItems)}
            />
          ) : (
            <Placeholder placeholderText="Add some photos" />
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
