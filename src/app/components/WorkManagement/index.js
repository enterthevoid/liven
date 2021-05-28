import React, { useState, useEffect } from "react";
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
    onSubmit(updatedWork);

    // if (validate()) {
    //   onSubmit(updatedWork);
    // }
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

  console.log("PHOTOS", updatedWork?.photos);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginLeft: 16,
      }}
    >
      <h3 style={{ marginTop: 0 }}>Work Details</h3>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            marginRight: 16,
          }}
        >
          <TextField
            id="name"
            label="Name"
            type="text-area"
            value={updatedWork?.name}
            onChange={(value) => handleChange("name", value)}

            // isError={errors.name}
          />
          <TextField
            id="description"
            type="textarea"
            label="Description"
            value={updatedWork?.description}
            onChange={(value) => handleChange("description", value)}

            // isError={errors.description}
          />

          {!isEqual(updatedWork, work) && (
            <Button onClick={() => handleSubmit()} label="Save" />
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: 24,
              marginBottom: 4,
            }}
          >
            <ImagePicker
              style={{ position: "absolute", left: 0 }}
              onChange={(files) => handleChange("photos", files)}
            />
            <Button
              styles={{ background: "#ffa399" }}
              onClick={() => handleDelete(updatedWork.id)}
              label="Delete Work"
            />
          </div>

          <div style={{ height: "77vh", width: "100%", overflow: "auto" }}>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap" }}>
              {updatedWork?.photos?.length > 0 &&
                Object.values(updatedWork?.photos)?.map((img, index) => {
                  return (
                    <div
                      styles={{ display: "flex", flexDirection: "row-reverse" }}
                      key={img.img || `img#${index}`}
                    >
                      <Button
                        style={{ position: "absolute", right: 0, top: 0 }}
                        onClick={() => handleRemoveImage(index)}
                        icon={<CloseIcon />}
                      />
                      <img
                        style={{
                          padding: 8,
                          margin: 4,
                          maxHeight: 200,
                          maxWidth: 200,
                          objectFit: "contain",
                          background: "rgb(211 211 211)",
                        }}
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

export default WorkManagement;
