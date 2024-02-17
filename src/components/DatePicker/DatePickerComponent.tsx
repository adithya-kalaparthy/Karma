import React, { useEffect, useState } from "react";
import { TableEditorProps } from "../../types/Task";
import { getValidDate } from "../../utils/utils";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box } from "@mui/material";

// Context
import { useTaskDataContext } from "../contexts/TaskDataContext";

const DatePickerComponent: React.FC<TableEditorProps> = ({ task }) => {
  // Clear Status of the date picker field.
  const [cleared, setCleared] = useState<boolean>(false);
  // Task Data context from the parents.
  const taskContext = useTaskDataContext();
  const taskList = taskContext.taskList;
  // Validate the due_date associated with the tasks.
  // If there is no value for due_date, null value is set.
  const [dueDate, setDueDate] = useState<Date | null>(
    task.due_date ? getValidDate(task.due_date) : null
  );

  useEffect(() => {
    // When the field gets cleared, set the cleared status to false
    // after a second.
    if (cleared) {
      const timeOut = setTimeout(() => {
        setCleared(false);
      }, 1000);

      return () => clearTimeout(timeOut);
    }
    return () => {};
  });

  const handleDateChange = (newDate: Date | null) => {
    setDueDate(newDate);

    taskList.forEach((currTask) => {
      if (currTask.task_id == task.task_id) {
        if (newDate) {
          currTask.due_date = newDate.toDateString();
        } else {
          currTask.due_date = "";
        }
      }
    });

    taskContext.handleDataEdit([...taskList]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "250px" }}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            sx={{ width: 250 }}
            views={["year", "month", "day"]}
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
            format="MMMM dd, yyyy"
            value={dueDate}
            onChange={handleDateChange}
          />
        </DemoContainer>
      </Box>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
