import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Drag'n'drop
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

// Material
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

// Styles
import "./styles.scss";

const SortableItem = sortableElement((props) => {
  const { onRemoveImage, value } = props;
  const src = value.img || window.URL.createObjectURL(value);

  return (
    <Paper className="image-card">
      <IconButton
        size="small"
        aria-label="delete"
        onClick={() => onRemoveImage(value)}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
      <img alt="image" src={src} />
    </Paper>
  );
});

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {children}
    </Box>
  );
});

const ReordableList = (props) => {
  const { items, handleRemoveImage, handleSort } = props;

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
          onRemoveImage={(value) => handleRemoveImage(value)}
        />
      ))}
    </SortableContainer>
  );
};

// Props

ReordableList.propTypes = {
  items: PropTypes.array,
  handleRemoveImage: PropTypes.func,
  handleSort: PropTypes.func,
};

export default ReordableList;
