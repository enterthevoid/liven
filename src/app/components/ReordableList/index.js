import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import FullScreenExitIcon from "@material-ui/icons/FullscreenExit";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  imageCard: {
    height: "fit-content",
    margin: theme.spacing(1),
    marginTop: 0,
    marginLeft: 0,
    background: theme.palette.grey[300],

    "& button": {
      margin: theme.spacing(1),
    },
    "& img": {
      padding: theme.spacing(1),
      width: 118,
      height: 118,
      objectFit: "contain",
    },
  },
}));

const SortableItem = sortableElement(({ onRemoveImage, value }) => {
  const src = value.img || window.URL.createObjectURL(value);
  const classes = useStyles();
  const [isPreviewMode, setPreviewMode] = useState(false);
  const [showAction, setShowAction] = useState(false);

  return (
    <Paper
      className={classes.imageCard}
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
    >
      <Box display="flex" justifyContent="space-between">
        {showAction ? (
          <IconButton
            size="small"
            className={classes.previewButton}
            onClick={() => setPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? <FullScreenExitIcon /> : <FullScreenIcon />}
          </IconButton>
        ) : (
          <div />
        )}
        <IconButton
          size="small"
          className={classes.deleteButton}
          onClick={onRemoveImage}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <img
        alt="image"
        src={src}
        style={isPreviewMode ? { width: 600, height: "auto" } : {}}
      />
    </Paper>
  );
});

const SortableContainer = sortableContainer(({ children }) => (
  <Box display="flex" flexWrap="wrap">
    {children}
  </Box>
));

const ReordableList = ({ items, handleRemoveImage, handleSort }) => {
  const [elems, setUpdateItems] = useState(items);

  useEffect(() => {
    setUpdateItems(items);
  }, [items]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const sortedItems = arrayMoveImmutable(elems, oldIndex, newIndex);

    handleSort(sortedItems);
    setUpdateItems(sortedItems);
  };

  return (
    <SortableContainer onSortEnd={onSortEnd} distance={1} axis="xy">
      {elems.map((value, index) => (
        <SortableItem
          key={`item-${index}_${value.img || value.name}`}
          index={index}
          value={value}
          onRemoveImage={() => handleRemoveImage(value)}
        />
      ))}
    </SortableContainer>
  );
};

ReordableList.propTypes = {
  items: PropTypes.array,
  handleRemoveImage: PropTypes.func,
  handleSort: PropTypes.func,
};

export default ReordableList;
