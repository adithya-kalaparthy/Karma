import { useState } from "react";
import { Task, TableEditorProps } from "../../types/Task";
import { useTaskDataContext } from "../contexts/TaskDataContext";

// Styling
import "./TitleEditorComponent.css";
import "../../App.css";

const TitleEditorComponent: React.FC<TableEditorProps> = ({ task }) => {
  const taskContext = useTaskDataContext();
  const taskList: Task[] = taskContext.taskList;
  const [values, setValues] = useState({
    task_title: task.task_title,
  });

  const handleChange = (field: string, value: string) => {
    setValues({ ...values, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    taskList.forEach((currTask: Task) => {
      if (currTask.task_id == task.task_id) {
        currTask.task_title = values.task_title;
      }
    });

    taskContext.handleDataEdit([...taskList]);
  };

  return (
    <form className="task-title-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-title-input"
        value={values.task_title}
        onChange={(e) => handleChange("task_title", e.target.value)}
        onBlur={handleSubmit}
      />
    </form>
  );
};

export default TitleEditorComponent;
