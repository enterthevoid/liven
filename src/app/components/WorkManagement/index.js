import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

// Components
import TextField from "../TextField";
import Button from "../Button";
import ImagePicker from "../ImagePicker";

// Assets
import { ReactComponent as CloseIcon } from "../../../assets/close.svg";

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
    // onSubmit(updatedWork);

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
      <h3>Work Details</h3>
      <div className="work-management--flex">
        <div className="work-management--form">
          <TextField
            id="name"
            label="Name"
            type="text-area"
            value={updatedWork?.name}
            onChange={(value) => handleChange("name", value)}
            isError={workErrors.name}
          />
          <TextField
            id="description"
            type="textarea"
            label="Description"
            value={updatedWork?.description}
            onChange={(value) => handleChange("description", value)}
            isError={workErrors.description}
          />

          {!isEqual(updatedWork, work) && (
            <Button onClick={() => handleSubmit()} label="Save" />
          )}
        </div>
        <div className="work-management--img-section">
          <div className="work-management--actions">
            <ImagePicker
              style={{ position: "absolute", left: 0 }}
              onChange={(files) => handleChange("photos", files)}
            />

            {updatedWork?.id && (
              <Button
                className="button--delete"
                onClick={() => handleDelete(updatedWork.id)}
                label="Delete Work"
              />
            )}
          </div>

          <div className="work-management--image-list-wrapper">
            <div className="work-management--image-list">
              {updatedWork?.photos?.length > 0 &&
                Object.values(updatedWork?.photos)?.map((img, index) => {
                  return (
                    <div
                      className="work-management--image-wrapper"
                      key={img.img || `img#${index}`}
                    >
                      <Button
                        onClick={() => handleRemoveImage(index)}
                        icon={<CloseIcon />}
                      />
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
