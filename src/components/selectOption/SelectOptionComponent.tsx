import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useTaskDataContext } from "../contexts/TaskDataContext";
import { TableEditorProps, Task } from "../../types/Task";
import { taskStatusOptions } from "../contexts/TableData";

// Styling.
import "./SelectOptionComponent.css";

const SelectOptionComponent: React.FC<TableEditorProps> = ({ task }) => {
  const taskContext = useTaskDataContext();
  const taskList: Task[] = taskContext.taskList;
  const [status, setStatus] = useState(task.status);

  const handleChange = (status: string) => {
    setStatus(status);
  };

  const updateTaskList = (e: React.ChangeEvent) => {
    e.preventDefault();
    taskList.forEach((currTask: Task) => {
      if (currTask.task_id == task.task_id) {
        currTask.status = status;
      }
    });

    taskContext.handleDataEdit(taskList);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="status-select-label">Status</InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        value={status}
        label="Status"
        onChange={(e) => handleChange(e.target.value)}
        onBlur={updateTaskList}
      >
        {taskStatusOptions.map((option) => (
          <MenuItem
            className="status-menu-option"
            key={option.status}
            value={option.status}
          >
            <div className="status-option-div">
              <Box
                width="20px"
                marginRight="10px"
                bgcolor={option.color}
                sx={{ opacity: "0.4" }}
              ></Box>
              <span>{option.status}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectOptionComponent;
