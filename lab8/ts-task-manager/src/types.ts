export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type BugSeverity = 'low' | 'high' | 'critical';


export interface BaseTask {
  id: string;
  title: string;
  status: TaskStatus;
}


export interface Bug extends BaseTask {
  type: 'bug'; 
  severity: BugSeverity;
}


export interface Feature extends BaseTask {
  type: 'feature'; 
  expectedRelease?: string;
  priority: number;
}


export type Task = Bug | Feature;


export const isHighPriorityBug = (task: Task): task is Bug => {
  return task.type === 'bug' && task.severity === 'critical';
};


export const filterTasks = (tasks: Task[], query: string): Task[] => {
  return tasks.filter(task => 
    task.title.toLowerCase().includes(query.toLowerCase())
  );
};