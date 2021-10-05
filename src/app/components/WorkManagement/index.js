import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

// Drag'n'drop
import Gallery from "react-photo-gallery";
import { arrayMoveImmutable } from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

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
      if (isOutOfBounds(updatedWork[prop])) {
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

  const handleRemoveImage = (item) => {
    let newWork = {
      ...updatedWork,
      photos: updatedWork.photos.filter((elem) => {
        if (elem?.type === "image/jpeg") {
          return elem.name !== item.photo.file.name;
        } else {
          return elem.img !== item.photo.img;
        }
      }),
    };

    setUpdateWork(newWork);
  };

  // Drag and drop

  const galleryPhotos =
    updatedWork?.photos.map((el) => ({
      ...el,
      src: el.img || "",
      file: !!el.img ? null : el,
      key: !!el.img ? el.img : `new_image-${el.name}`,
      width: 1,
      height: 1,
    })) || [];

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const sortedWork = {
      ...updatedWork,
      photos: arrayMoveImmutable(updatedWork.photos, oldIndex, newIndex),
    };

    setUpdateWork(sortedWork);
  };

  const SortablePhoto = SortableElement((item) => (
    <div className="work-management--image-wrapper">
      <Fab
        size="small"
        aria-label="delete"
        onClick={() => handleRemoveImage(item)}
      >
        <CloseIcon fontSize="small" />
      </Fab>
      <img
        alt="image"
        src={item.photo.img || window.URL.createObjectURL(item.photo.file)}
      />
    </div>
  ));

  const SortableGallery = SortableContainer(({ items }) => (
    <Gallery
      photos={items}
      renderImage={(props) => <SortablePhoto {...props} />}
    />
  ));

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
            helperText={workErrors.name || ""}
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
            error={!!workErrors.description}
            helperText={workErrors.description || ""}
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

        <div className="work-management--image-list-wrapper">
          <div className="work-management--image-list">
            <SortableGallery
              items={galleryPhotos}
              onSortEnd={(props) => onSortEnd(props)}
              distance={1}
              axis="xy"
            />
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
