export interface Task {
  task_id: number;
  task_title: string;
  user_id: string;
  project_id: number;
  task_content: string;
  tags: string[];
  status: string;
  due_date: string;
  create_time: string;
  update_time: string;
}
export interface TaskContext {
  taskList: Task[];
  handleDataEdit: (updatedTaskList: Task[]) => void;
}

export interface TableEditorProps {
  task: Task;
}
