import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const SmallModal = ({
  isOpen,
  onClose,
  message,
  children,
  onSubmit,
  submitLabel,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>Confirm action</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
      {children}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
      <Button
        onClick={onSubmit}
        color={submitLabel === "delete" ? "secondary" : "primary"}
        autoFocus
      >
        {submitLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

// Props

SmallModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default SmallModal;
