import { Task } from "../../types/Task";
import { TaskService } from "../../services/TaskService";
import { useEffect, useState } from "react";

const TableComponent = () => {
  const taskService = new TaskService();
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const parsedData = await taskService.getTaskData();
      setTaskList(parsedData);
    })();
  }, []);

  if (taskList.length == 0) {
    return (
      <div>
        <span>No tasks are available</span>
      </div>
    );
  }

  return (
    <div className="table-container">
      <span>{taskList[0].task_title}</span>
    </div>
  );
};

export default TableComponent;
