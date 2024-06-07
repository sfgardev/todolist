import { Dispatch } from "redux";
import {
  TaskType,
  UpdateDomainTaskModelType,
  todolistAPI
} from "../../api/todolist-api";
import { AppRootStateType } from "../../app/store";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "../Todos/todolists-reducer";

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.reduce((acc, todo) => {
        acc[todo.id] = [];
        return acc;
      }, state);
    case "SET_TASKS":
      return { ...state, [action.todolistId]: action.tasks };
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolist.id]: [],
      };
    case "REMOVE-TODOLIST":
      // 1
      // const copyState = { ...state };
      // delete copyState[action.id];
      // return copyState;

      // 2
      const { [action.id]: a, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

// AC
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({ type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId }) as const;

export const addTaskAC = (task: TaskType) =>
  ({ type: "ADD-TASK", task }) as const;

export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: Partial<UpdateDomainTaskModelType>
) => ({ type: "UPDATE-TASK", todolistId, taskId, model }) as const;

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({
    type: "SET_TASKS",
    todolistId,
    tasks,
  }) as const;

// TC
export const getTasksTC =
  (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTasks(todolistId).then((response) => {
      dispatch(setTasksAC(todolistId, response.data.items));
    });
  };

export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTask(todolistId, taskId).then((response) => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
  };

export const createTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTask(todolistId, title).then((response) => {
      dispatch(addTaskAC(response.data.data.item));
    });
  };

export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    model: Partial<UpdateDomainTaskModelType>
  ) =>
  (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    const tasks = getState().tasks;
    const task = tasks[todolistId].find((task) => task.id === taskId);

    if (!task) return;

    const apiModel: UpdateDomainTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      title: task.title,
      ...model,
    };

    todolistAPI.updateTask(todolistId, taskId, apiModel).then((response) => {
      dispatch(updateTaskAC(todolistId, taskId, model));
    });
  };

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

// type UpdateDomainTaskModelType = {
//   title?: string;
//   description?: string;
//   status?: TaskStatuses;
//   priority?: TaskPriorities;
//   startDate?: string;
//   deadline?: string;
// };

// type UpdateDomainTaskModelType = Omit<TaskType, 'id' | 'todoListId' | 'addedDate'>

// types
type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>;
