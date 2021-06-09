import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

// Components
import Button from "../Button";

// Styles
import "./styles.scss";

const smallModalStyles = {
  content: {
    width: "fit-content",
    height: "fit-content",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    overflowX: "auto",
    border: "1px solid #1A1B1C",
    borderRadius: "0",
    boxShadow: "3px 5px 0 #1A1B1C",
    backgroundColor: "#F9F8F6",
  },
  overlay: {
    backgroundColor: "rgba(26,27,28,0.5)",
  },
};

const SmallModal = (props) => {
  const { isOpen, onClose, title, children, className, onSubmit, submitLabel } =
    props;

  return (
    <Modal
      className={className}
      closeTimeoutMS={500}
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      portalClassName="small"
      style={{
        content: smallModalStyles.content,
        overlay: smallModalStyles.overlay,
      }}
    >
      {title && (
        <div className="small-modal--heading">
          <h3>{title}</h3>
        </div>
      )}
      <div className="small-modal--content-wrapper">
        {children}

        <div className="small-modal--actions">
          <Button
            className={`button${submitLabel === "delete" ? "--delete" : ""}`}
            onClick={onSubmit}
            label={submitLabel}
          />
          <Button onClick={onClose} label="Cancel" />
        </div>
      </div>
    </Modal>
  );
};

// Props

SmallModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default SmallModal;
