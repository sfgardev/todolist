import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "1a29ecc2-ab9c-42ea-aefe-c8cdd94fe0a2",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  ...settings,
});

// api
export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("/todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("/todo-lists", {
      title,
    });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}`, { title });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(
      `/todo-lists/${todolistId}/tasks`
    );
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks
    `,
      { title }
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `/todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(
    todolistId: string,
    taskId: string,
    model: UpdateDomainTaskModelType
  ) {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}
    `,
      model
    );
  },
};

// types
export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TaskType = {
  id: string;
  todoListId: string;
  addedDate: string;
  title: string;
  description: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export type TaskNotEditableFields = "id" | "todoListId" | "addedDate" | "order";
export type UpdateDomainTaskModelType = Omit<TaskType, TaskNotEditableFields>;

type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type ResponseType<T = {}> = {
  data: T;
  fieldErrors: string[];
  messages: string[];
  resultCode: number;
};

// export type UpdateTaskModelType = {
//   title: string;
//   description: string;
//   status: TaskStatuses;
//   priority: TaskPriorities;
//   startDate: string;
//   deadline: string;
// };

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4,
}
