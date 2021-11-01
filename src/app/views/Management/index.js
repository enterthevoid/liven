import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
import {
  updateWork,
  deleteWork,
  createWork,
} from "../../../redux/works/actions";
import {
  makeSelectWorksList,
  makeSelectWorkCreating,
  makeSelectWorkUpdating,
  makeSelectWorkDeleting,
} from "../../../redux/works/selectors";
import WorkManagement from "../../components/WorkManagement";
import SmallModal from "../../components/Modal";
import Loader from "../../components/Loader";
import Placeholder from "../../components/Placeholder";
import { useWindowDimensions } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  management: {
    width: "100%",
    display: "flex",
  },
  worksList: {
    minWidth: 350,
  },
  whiteSpace: {
    whiteSpace: "pre",
  },
  list: {
    padding: 0,
  },
  listHeading: {
    padding: theme.spacing(2),
  },
}));

const ManagementPage = ({
  onUpdateWork,
  onCreateWork,
  onDeleteWork,
  workCreating,
  workUpdating,
  workDeleting,
  worksList,
}) => {
  const classes = useStyles();

  const [selectedWork, setSelectedWork] = useState(false);
  const [isCreateWork, setCreateWork] = useState(false);
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);

  const { downMediumScreen, innerHeight } = useWindowDimensions();
  const headerHeight = 108 + 22;

  const handleSubmit = (work) => {
    if (isCreateWork) {
      onCreateWork(work);
    } else {
      onUpdateWork(work, work.id);
    }

    setSelectedWork(work);
    setCreateWork(false);
  };

  const handleDelete = (workId) => {
    onDeleteWork(workId);
    setSelectedWork(false);
  };

  if (downMediumScreen)
    return <h3>Sorry but this page available only for desktop</h3>;

  if (workDeleting || workCreating || workUpdating) {
    return <Loader />;
  }

  return (
    <Paper
      elevation={3}
      className={classes.management}
      style={{ height: innerHeight - headerHeight }}
    >
      <div className={classes.worksList}>
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.listHeading}
          alignItems="center"
        >
          <Typography className={classes.whiteSpace} variant="h5" component="p">
            Works List
          </Typography>
          <Button
            onClick={() => setCreateWork(true)}
            variant="contained"
            color="primary"
            className={classes.whiteSpace}
            startIcon={<AddIcon />}
          >
            Create Work
          </Button>
        </Box>
        <List component="nav" className={classes.list}>
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
        <Placeholder placeholderText="Select Item" />
      )}
    </Paper>
  );
};

ManagementPage.propTypes = {
  onUpdateWork: PropTypes.func,
  onCreateWork: PropTypes.func,
  onDeleteWork: PropTypes.func,
  workCreating: PropTypes.bool,
  workUpdating: PropTypes.bool,
  workDeleting: PropTypes.bool,
  worksList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  worksList: makeSelectWorksList(),
  workDeleting: makeSelectWorkDeleting(),
  workCreating: makeSelectWorkCreating(),
  workUpdating: makeSelectWorkUpdating(),
});

const mapDispatchToProps = {
  onUpdateWork: (work) => updateWork(work, work.id),
  onCreateWork: (work) => createWork(work),
  onDeleteWork: (work) => deleteWork(work, work.id),
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManagementPage)
);
