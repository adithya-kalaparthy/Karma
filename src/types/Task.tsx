export interface Task {
  task_id: number;
  task_title: string;
  user_id: number;
  project_id: number;
  task_content: string;
  tags: string[];
  create_time: string;
  update_time: string;
}
