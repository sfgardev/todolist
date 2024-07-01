import { TaskPriorities, TaskStatuses } from "../../../common/enum/enum";
import { BaseResponse } from "../../../common/types";
import { instance } from "./instance";

// api
export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("/todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType }>>("/todo-lists", {
      title,
    });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`);
  },
  updateTodolist(arg: UpdateTodolistArgs) {
    const { title, todolistId } = arg;
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}`, { title });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(
      `/todo-lists/${todolistId}/tasks`
    );
  },
  createTask(arg: CreateTaskArgs) {
    const { title, todolistId } = arg;
    return instance.post<BaseResponse<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks
    `,
      { title }
    );
  },
  deleteTask(arg: RemoveTaskArgs) {
    const { taskId, todolistId } = arg;
    return instance.delete<BaseResponse>(
      `/todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(arg: UpdateTaskArgs) {
    const { taskId, todolistId, model } = arg;
    return instance.put<BaseResponse<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}
    `,
      model
    );
  },
};

// types
export type UpdateTodolistArgs = {
  todolistId: string;
  title: string;
};

export type CreateTaskArgs = {
  todolistId: string;
  title: string;
};

export type RemoveTaskArgs = {
  todolistId: string;
  taskId: string;
};

export type UpdateTaskArgs = {
  todolistId: string;
  taskId: string;
  model: Partial<UpdateDomainTaskModelType>;
};

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
