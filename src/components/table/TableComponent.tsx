import { Task } from "../../types/Task";
import { TaskService } from "../../services/TaskService";
import { TaskDataContext } from "../contexts/TaskDataContext";
import { useEffect, useMemo, useState } from "react";
import { Columns } from "../../types/HomePage";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const TableComponent = () => {
  // Data of the table.
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const taskService = new TaskService();

    (async () => {
      const parsedData = await taskService.getTaskData();
      setTaskList(parsedData);
    })();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Task>[]>(() => Columns, []);

  const table = useMaterialReactTable({
    columns: columns,
    data: taskList,
    enableColumnResizing: true,
  });

  const handleDataEdit = (updatedTaskList: Task[]): void => {
    setTaskList([]);

    (() => {
      setTimeout(() => {
        setTaskList(updatedTaskList);
      }, 100);
    })();
  };

  return (
    <div className="table-container">
      <TaskDataContext.Provider
        value={{ taskList: taskList, handleDataEdit: handleDataEdit }}
      >
        <MaterialReactTable table={table} />
      </TaskDataContext.Provider>
    </div>
  );
};

export default TableComponent;
