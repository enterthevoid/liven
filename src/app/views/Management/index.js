/* eslint-disable react/jsx-key */
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";

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
  loadWorksList,
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

  const worksCount = useSelector((state) => state.works.worksCount);
  const worksLoading = useSelector((state) => state.works.worksLoading);
  const worksList = useSelector((state) => state.works.worksList);

  const workDeleting = useSelector((state) => state.works.workDeleting);
  const workCreating = useSelector((state) => state.works.workCreating);
  const workUpdating = useSelector((state) => state.works.workUpdating);

  useEffect(() => {
    dispatch(loadWorksList());
  }, [worksCount === null && !worksLoading]);

  const [selectedWork, setSelectedWork] = useState(false);
  const [isCreateWork, setCreateWork] = useState(false);
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);

  const handleSubmit = (work) => {
    if (isCreateWork) {
      dispatch(createWork(work));
    } else {
      dispatch(updateWork(work, work.id));
    }

    setSelectedWork(false);
    setCreateWork(false);
  };

  const handleDelete = (workId) => {
    dispatch(deleteWork(workId));
    setSelectedWork(false);
  };

  if (isMobile) return <h3>Sorry but this page available only for desctop</h3>;

  if (workDeleting || workCreating || workUpdating) return <Loader />;

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
            Works List
          </Typography>
          <Button
            onClick={() => setCreateWork(true)}
            variant="contained"
            color="primary"
            style={{ whiteSpace: "pre" }}
            startIcon={<AddIcon />}
          >
            Create Work
          </Button>
        </Box>
        <List component="nav" style={{ paddingTop: 0 }}>
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

export default withRouter(ManagementPage);
