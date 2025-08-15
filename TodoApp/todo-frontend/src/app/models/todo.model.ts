export interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt?: Date;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface UpdateTodoRequest {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}