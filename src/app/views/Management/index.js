/* eslint-disable react/jsx-key */
import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";

// Material
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Actions
import {
  updateWork,
  deleteWork,
  createWork,
} from "../../../redux/works/actions";

// Components
import WorkManagement from "../../components/WorkManagement";
import SmallModal from "../../components/Modal";
import Loader from "../../components/Loader";

// Styles
import "./styles.scss";

const ManagementPage = () => {
  const dispatch = useDispatch();

  const worksList = useSelector((state) => state.works.worksList);
  const workDeleting = useSelector((state) => state.works.workDeleting);
  const workCreating = useSelector((state) => state.works.workCreating);
  const workUpdating = useSelector((state) => state.works.workUpdating);

  const [selectedWork, setSelectedWork] = useState(false);
  const [isCreateWork, setCreateWork] = useState(false);
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);

  const handleSubmit = (work) => {
    if (isCreateWork) {
      dispatch(createWork(work));
    } else {
      dispatch(updateWork(work, work.id));
    }

    setSelectedWork(work);
    setCreateWork(false);
  };

  const handleDelete = (workId) => {
    dispatch(deleteWork(workId));
    setSelectedWork(false);
  };

  if (isMobile) return <h3>Sorry but this page available only for desktop</h3>;

  if (workDeleting || workCreating || workUpdating) {
    return <Loader inputStyles={{ top: "45%", left: "45%" }} />;
  }

  return (
    <Paper elevation={3} className="management">
      <div className="management--work-list">
        <Box
          display="flex"
          justifyContent="space-between"
          padding={"24px"}
          alignItems="center"
        >
          <Typography variant="h5" component="p" style={{ whiteSpace: "pre" }}>
            {/* TODO: Move inline styles to css */}
            Works List
          </Typography>
          <Button
            onClick={() => setCreateWork(true)}
            variant="contained"
            color="primary"
            style={{ whiteSpace: "pre" }} //TODO: Move inline styles to css
            startIcon={<AddIcon />}
          >
            Create Work
          </Button>
        </Box>
        <List component="nav" style={{ paddingTop: 0 }}>
          {/* TODO: Move inline styles to css */}
          <Divider />
          {Object.values(worksList).map((work) => (
            <Fragment key={work.id}>
              <ListItem
                selected={work.id === selectedWork.id}
                button
                onClick={() => {
                  setCreateWork(false);
                  setSelectedWork(work);
                }}
              >
                <ListItemIcon>{work?.photos?.length || 0}</ListItemIcon>
                <ListItemText primary={work.name} />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </div>

      <Divider orientation="vertical" />

      <SmallModal
        isOpen={isDeleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        message="Are you sure you want to delete work?"
        submitLabel="delete"
        onSubmit={() => {
          handleDelete(selectedWork.id);
          setDeleteConfirm(false);
        }}
      />

      {!!selectedWork || isCreateWork ? (
        <WorkManagement
          work={
            isCreateWork
              ? {
                  name: "New Work Title",
                  description: "Type in some description",
                  photos: [],
                }
              : selectedWork
          }
          onClose={() => setSelectedWork(false)}
          onSubmit={(work) => handleSubmit(work)}
          onDelete={() => setDeleteConfirm(true)}
        />
      ) : (
        <div className="management--placeholder">
          <h3>Select Item</h3>
        </div>
      )}
    </Paper>
  );
};

// Props

ManagementPage.propTypes = {
  workCreating: PropTypes.bool,
  workUpdating: PropTypes.bool,
  workDeleting: PropTypes.bool,
  worksList: PropTypes.object,
};

export default withRouter(ManagementPage);
