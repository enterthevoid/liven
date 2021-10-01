import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

// Material
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";

// Components
import ImagePicker from "../ImagePicker";

// Styles
import "./styles.scss";

const WorkManagement = (props) => {
  const { work, onSubmit, onDelete } = props;

  const [updatedWork, setUpdateWork] = useState(work);
  const [workErrors, setWorkErrors] = useState({});

  useEffect(() => {
    setUpdateWork(work);
  }, [work]);

  const validate = () => {
    const REQUIRED = ["name", "description"];
    const isOutOfBounds = (s) => !s || s.length < 2;

    let errors = workErrors;
    REQUIRED.forEach((prop) => {
      if (isOutOfBounds(work[prop])) {
        errors[prop] = "This field is required and cannot be empty.";
      }
    });

    setWorkErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (prop, data) => {
    let newWork = { ...updatedWork, [`${prop}`]: data };

    if (prop === "photos") {
      newWork = { ...updatedWork, photos: [...updatedWork.photos, ...data] };
    }
    let errors = workErrors;
    delete workErrors[prop];

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

  const handleRemoveImage = (index) => {
    let newWork = {
      ...updatedWork,
      photos: updatedWork.photos.filter((e, i) => i !== index),
    };
    setUpdateWork(newWork);
  };

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
            error={!!workErrors.name}
            onChange={(e) => handleChange("name", e.target.value)}
            helperText={workErrors.name}
            style={{ width: 300 }}
          />

          <TextField
            style={{ marginTop: 16, width: 300 }} //TODO: Move inline styles to css
            s
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={6}
            value={updatedWork?.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={!!workErrors.description}
            helperText={workErrors.description}
          />

          {!isEqual(updatedWork, work) && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
              style={{ marginTop: 12 }} //TODO: Move inline styles to css
            >
              Save Work
            </Button>
          )}
        </div>

        <div className="work-management--img-section">
          <div className="work-management--image-list-wrapper">
            <div className="work-management--image-list">
              {updatedWork?.photos?.length > 0 &&
                Object.values(updatedWork?.photos)?.map((img, index) => {
                  return (
                    <div
                      className="work-management--image-wrapper"
                      key={img.img || `img#${index}`}
                    >
                      <Fab
                        size="small"
                        aria-label="delete"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon fontSize="small" />
                      </Fab>
                      <img
                        alt={img.id}
                        src={img?.img || window?.URL?.createObjectURL(img)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
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
