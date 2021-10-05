import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

// Material
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";

// Components
import ImagePicker from "../ImagePicker";
import ReordableList from "../ReordableList";

// Styles
import "./styles.scss";

const WorkManagement = (props) => {
  const { work, onSubmit, onDelete } = props;
  const defaultErr = {
    description: false,
    name: false,
  };
  const [updatedWork, setUpdateWork] = useState(work);
  const [workErrors, setWorkErrors] = useState(defaultErr);

  useEffect(() => {
    setUpdateWork(work);
    setWorkErrors(defaultErr);
  }, [work]);

  const validate = () => {
    const REQUIRED = ["name", "description"];
    const isOutOfBounds = (s) => !s || s.length < 2;
    let errors = workErrors;

    REQUIRED.forEach((prop) => {
      if (isOutOfBounds(updatedWork[prop])) {
        errors[prop] = true;
      }
    });

    setWorkErrors(errors);
    return !errors.name || !errors.description;
  };

  const handleChange = (prop, data) => {
    let newWork = { ...updatedWork, [`${prop}`]: data };

    if (prop === "photos") {
      newWork = { ...updatedWork, photos: [...updatedWork.photos, ...data] };
    }

    let errors = workErrors;
    if (data.length > 0) {
      errors[prop] = false;
    } else {
      errors[prop] = true;
    }

    setWorkErrors(errors);
    setUpdateWork(newWork);
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(updatedWork);
    }
  };

  const handleDelete = (workId) => {
    onDelete(workId);
  };

  const handleRemoveImage = (item) => {
    let newWork = {
      ...updatedWork,
      photos: updatedWork.photos.filter((elem) => {
        if (elem?.type === "image/jpeg") {
          return elem.name !== item.name;
        } else {
          return elem.img !== item.img;
        }
      }),
    };

    setUpdateWork(newWork);
  };

  const handleSort = (sortedItems) => {
    const sortedWork = {
      ...updatedWork,
      photos: sortedItems,
    };

    setUpdateWork(sortedWork);
  };

  const getHelperText = (isErr) =>
    isErr ? "This field is required and cannot be empty." : " ";

  return (
    <div className="work-management">
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ padding: 24 }}
      >
        <Typography variant="h5" component="p">
          Work Details
        </Typography>

        <Box>
          <ImagePicker onChange={(files) => handleChange("photos", files)} />

          {updatedWork?.id && (
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: 12 }} //TODO: Move inline styles to css
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(updatedWork.id)}
            >
              Delete Work
            </Button>
          )}
        </Box>
      </Box>
      <Divider />

      <div className="work-management--flex">
        <div className="work-management--form">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={updatedWork?.name}
            error={workErrors.name}
            onChange={(e) => handleChange("name", e.target.value)}
            helperText={getHelperText(workErrors.name)}
            style={{ width: 300 }} //TODO: Move inline styles to css
          />

          <TextField
            style={{ marginTop: 16, width: 300 }} //TODO: Move inline styles to css
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={6}
            value={updatedWork?.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={workErrors.description}
            helperText={getHelperText(workErrors.description)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
            style={{ marginTop: 12 }} //TODO: Move inline styles to css
            disabled={
              isEqual(updatedWork, work) ||
              workErrors.name ||
              workErrors.description
            }
          >
            Save Work
          </Button>
        </div>

        <div className="work-management--image-list-wrapper">
          <ReordableList
            items={updatedWork?.photos || []}
            handleRemoveImage={(item) => handleRemoveImage(item)}
            handleSort={(sortedItems) => handleSort(sortedItems)}
          />
        </div>
      </div>
    </div>
  );
};

// Props

WorkManagement.propTypes = {
  work: PropTypes.object,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default WorkManagement;
