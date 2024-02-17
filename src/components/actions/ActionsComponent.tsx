import React, { useState } from "react";
import { TableEditorProps, Task } from "../../types/Task";
// icons
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Styling
import "./ActionsComponent.css";
import "../../App.css";
import { useTaskDataContext } from "../contexts/TaskDataContext";
import TaskDeleteConfirm from "../dialogs/TaskDeleteConfirm";
import { Drawer } from "@mui/material";
import TaskEditComponent from "../taskEdit/TaskEditComponent";

const ActionsComponent: React.FC<TableEditorProps> = ({ task }) => {
  const taskContext = useTaskDataContext();
  const taskList: Task[] = taskContext.taskList;

  // Open or close Delete confirmation dialog box.
  const [isDelDialogOpen, setIsDelDialogOpen] = useState<boolean>(false);
  // Open or close Task Edit Drawer.
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const onDeleteSubmit = () => {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].task_id == task.task_id) {
        taskList.splice(i, 1);
      }
    }

    taskContext.handleDataEdit(taskList);

    if (isDelDialogOpen) setIsDelDialogOpen(false);
  };

  const openDeleteConfirm = () => {
    setIsDelDialogOpen(true);
  };

  return (
    <div className="actions-container">
      <div
        className="action-icon open-icon"
        onClick={() => setIsDrawerOpen(true)}
      >
        <OpenInNewIcon></OpenInNewIcon>
      </div>
      <div className="action-icon check-icon">
        <CheckCircleIcon></CheckCircleIcon>
      </div>
      <div className="action-icon delete-icon" onClick={openDeleteConfirm}>
        <DeleteIcon></DeleteIcon>
      </div>
      <div className="action-icon clear-icon">
        <ClearIcon></ClearIcon>
      </div>

      {isDelDialogOpen && (
        <TaskDeleteConfirm
          open={isDelDialogOpen}
          onDeleteSubmit={onDeleteSubmit}
        />
      )}

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        transitionDuration={500}
        SlideProps={{
          easing: "cubic-bezier(0.3, 0.1, 0.2, 1)",
        }}
      >
        <TaskEditComponent
          task={task}
          onTaskEditClose={() => setIsDrawerOpen(false)}
        ></TaskEditComponent>
      </Drawer>
    </div>
  );
};

export default ActionsComponent;
