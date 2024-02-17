import { Task } from "../types/Task";
import TaskList from "../../data/tasks.json";

export class TaskService {
  /**
   * Read Task data from tasks.json file and return the list of tasks.
   *
   * @remarks
   *
   *
   * @returns - List of tasks.
   */
  async getTaskData(): Promise<Task[]> {
    const parsedData: Task[] = [];

    TaskList.map((task: Task) => {
      parsedData.push(task);
    });

    return parsedData;
  }
}
