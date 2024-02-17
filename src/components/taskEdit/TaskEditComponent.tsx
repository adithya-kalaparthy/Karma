import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

// Types
import { Task } from "../../types/Task";
// Styling.
import "./TaskEditComponent.css";
// Data.
import { taskStatusOptions } from "../contexts/TableData";
import { getValidDate } from "../../utils/utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import { useTaskDataContext } from "../contexts/TaskDataContext";

interface TaskEditProps {
  task: Task;
  onTaskEditClose: () => void;
}

const TaskEditComponent: React.FC<TaskEditProps> = ({
  task,
  onTaskEditClose,
}) => {
  // Task fields.
  const [title, setTitle] = useState<string>(task.task_title);
  const [status, setStatus] = useState<string>(task.status);
  const [tags, setTags] = useState<string[]>(task.tags);
  // Validate the due_date associated with the tasks.
  // If there is no value for due_date, null value is set.
  const [dueDate, setDueDate] = useState<Date | null>(
    task.due_date ? getValidDate(task.due_date) : null
  );
  const [taskContent, setTaskContent] = useState<string>(task.task_content);

  // Task Data context from the parents.
  const taskContext = useTaskDataContext();
  const taskList: Task[] = taskContext.taskList;

  // Date field clearable variable.
  const [dateCleared, setDateCleared] = useState<boolean>(false);

  useEffect(() => {
    // When the field gets cleared, set the cleared status to false
    // after a second.
    if (dateCleared) {
      const timeOut = setTimeout(() => {
        setDateCleared(false);
      }, 1000);

      return () => clearTimeout(timeOut);
    }
    return () => {};
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    taskList.forEach((currTask: Task) => {
      if (currTask.task_id == task.task_id) {
        currTask.task_title = title;
        currTask.tags = tags;
        currTask.task_content == taskContent;
        currTask.status = status;
        currTask.due_date = dueDate?.toDateString() ?? "";
      }
    });

    taskContext.handleDataEdit([...taskList]);
    onTaskEditClose();
  };

  return (
    <Box className="task-editor-component" role="presentation">
      <form onSubmit={handleSubmit}>
        <h1 className="task-editor-heading">Edit Task</h1>
        <Stack spacing={2}>
          {/** Title field */}
          <div className="input-container">
            <InputLabel className="input-label">Title:</InputLabel>
            <TextField
              id="task-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                width: "640px",
              }}
              InputProps={{
                placeholder: "Task Title",
              }}
              autoFocus
            />
          </div>
          {/** Status field */}
          <div className="input-container">
            <InputLabel className="input-label">Status</InputLabel>
            <Select
              value={status}
              required
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                width: "250px",
              }}
            >
              {taskStatusOptions.map((option) => (
                <MenuItem
                  className="status-option"
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
          </div>
          {/** Tags field */}
          <div className="input-container">
            <InputLabel className="input-label">Tags:</InputLabel>
            <TextField
              id="task-title-input"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value.split(","))}
              sx={{
                width: "640px",
              }}
            />
          </div>
          {/** Due Date field */}
          <div className="input-container">
            <InputLabel className="input-label">Due Date:</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ width: "250px" }}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    sx={{ width: 250 }}
                    views={["year", "month", "day"]}
                    slotProps={{
                      field: {
                        clearable: true,
                        onClear: () => setDateCleared(true),
                      },
                    }}
                    format="MMMM dd, yyyy"
                    value={dueDate}
                    onChange={(newDate) => setDueDate(newDate)}
                  />
                </DemoContainer>
              </Box>
            </LocalizationProvider>
          </div>
          {/** Task Content field */}
          <div className="task-content-input-container">
            <InputLabel className="input-label">Notes:</InputLabel>
            <TextField
              id="content-input"
              type="text"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              sx={{
                width: "690px",
                height: "400px",
              }}
              rows={15}
              multiline
            />
          </div>
          {/** Buttons */}
          <div className="buttons-container">
            <Button
              onClick={onTaskEditClose}
              variant="outlined"
              endIcon={<ClearIcon />}
              sx={{
                borderRadius: "10px",
                color: "#bb0000d4",
                border: "2px solid #bb0000d4",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              endIcon={<CheckIcon />}
              className="save-btn"
              sx={{
                borderRadius: "10px",
                background: "#1ab31a",
                color: "white",
                fontWeight: "bold",
                marginRight: "25px",
              }}
            >
              Save
            </Button>
          </div>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskEditComponent;
