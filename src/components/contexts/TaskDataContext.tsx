import { createContext, useContext } from "react";
import { TaskContext } from "../../types/Task";

export const TaskDataContext = createContext<TaskContext | undefined>(
  undefined
);

export function useTaskDataContext(): TaskContext {
  const taskDataContext = useContext(TaskDataContext);

  if (taskDataContext == undefined) {
    throw new Error(
      "taskDataContext must contain tasklist and handleDataEdit functions"
    );
  }

  return taskDataContext;
}
