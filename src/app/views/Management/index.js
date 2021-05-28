import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

// Actions
import {
  loadWorksList,
  updateWork,
  deleteWork,
  createWork,
} from "../../../redux/works/actions";

// Components
import Button from "../../components/Button";
import WorkManagement from "../../components/WorkManagement";

// Styles
import "./styles.scss";

const ManagementPage = () => {
  const dispatch = useDispatch();

  const worksCount = useSelector((state) => state.works.worksCount);
  const worksLoading = useSelector((state) => state.works.worksCount);
  const worksList = useSelector((state) => state.works.worksList);
  const worksLoadCheck = worksCount === 0 && !worksLoading;

  useEffect(() => {
    dispatch(loadWorksList());
  }, [worksLoadCheck]);

  const [selectedWork, setSelectedWork] = useState(false);
  const [isCreateWork, setCreateWork] = useState(false);

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
    console.log("I ID", workId);

    dispatch(deleteWork(workId));
    setSelectedWork(false);
  };

  return (
    <div className="management">
      <div className="management-work-list">
        <h3>Works List</h3>
        <Button
          styles={{ margin: "24px 0px" }}
          onClick={() => setCreateWork(true)}
          label="Create Work"
        />
        {Object.values(worksList).map((work) => (
          <div
            style={work.id === selectedWork.id ? { background: "#dadada" } : {}}
            key={work.id}
            className="management-work-list-item"
            onClick={() => {
              setCreateWork(false);
              setSelectedWork(work);
            }}
          >
            <div className="management-work-list-item-naming">
              <h3>{work.name}</h3>
              <p>{work.description}</p>
            </div>
            <div className="management-work-list-item-count">
              {work?.photos?.length || 0}
            </div>
          </div>
        ))}
      </div>

      {!!selectedWork || isCreateWork ? (
        <WorkManagement
          work={
            isCreateWork
              ? {
                  name: "New Work",
                  description: "Type in some description",
                  photos: [],
                }
              : selectedWork
          }
          onClose={() => setSelectedWork(false)}
          onSubmit={(work) => handleSubmit(work)}
          onDelete={(workId) => handleDelete(workId)}
        />
      ) : (
        <div className="management-placeholder">
          <h3>Select Item</h3>
        </div>
      )}
    </div>
  );
};

export default withRouter(ManagementPage);
