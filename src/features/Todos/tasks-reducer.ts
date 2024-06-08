import { Dispatch } from "redux";
import {
  TaskType,
  UpdateDomainTaskModelType,
  todolistAPI,
} from "../../api/todolist-api";
import { AppRootStateType } from "../../app/store";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "../Todos/todolists-reducer";
import {
  RequestStatusType,
  SetAppErrorActionType,
  SetAppStatusActionType,
  setAppErrorAC,
  setAppStatusAC,
} from "../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

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
    case "SET-TASKS":
      return {
        ...state,
        [action.todolistId]: action.tasks.map((task) => ({
          ...task,
          entityStatus: "idle",
        })),
      };
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
          {
            ...action.task,
            entityStatus: "idle",
          },
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
    case "SET-TASK-ENTITY-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId
            ? { ...task, entityStatus: action.status }
            : task
        ),
      };
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
    type: "SET-TASKS",
    todolistId,
    tasks,
  }) as const;

export const setTaskEntityStatus = (
  todolistId: string,
  taskId: string,
  status: RequestStatusType
) => ({ type: "SET-TASK-ENTITY-STATUS", todolistId, taskId, status }) as const;

// TC
export const getTasksTC =
  (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .getTasks(todolistId)
      .then((response) => {
        if (response.data.error) {
          dispatch(setAppErrorAC(response.data.error));
          dispatch(setAppStatusAC("failed"));
        } else {
          dispatch(setTasksAC(todolistId, response.data.items));
          dispatch(setAppStatusAC("succeeded"));
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(setTaskEntityStatus(todolistId, taskId, "loading"));
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(removeTaskAC(taskId, todolistId));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const createTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .createTask(todolistId, title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(addTaskAC(response.data.data.item));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(response.data, dispatch);
          // if (response.data.messages.length) {
          //   dispatch(setAppErrorAC(response.data.messages[0]));
          // } else {
          //   dispatch(setAppErrorAC("Something went wrong"));
          // }
          // dispatch(setAppStatusAC("failed"));
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
        // dispatch(setAppErrorAC(error.message));
        // dispatch(setAppStatusAC("failed"));
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

    dispatch(setAppStatusAC("loading"));
    dispatch(setTaskEntityStatus(todolistId, taskId, "loading"));
    todolistAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(updateTaskAC(todolistId, taskId, model));
          dispatch(setAppStatusAC("succeeded"));
          dispatch(setTaskEntityStatus(todolistId, taskId, "succeeded"));
        } else {
          handleServerAppError(response.data, dispatch);
          // if (response.data.messages.length) {
          //   dispatch(setAppErrorAC(response.data.messages[0]));
          // } else {
          //   dispatch(setAppErrorAC("Something went wrong"));
          // }
          // dispatch(setAppStatusAC("failed"));
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
        // dispatch(setAppErrorAC(error.message));
        // dispatch(setAppStatusAC("failed"));
      });
  };

export type TaskEntityType = TaskType & {
  entityStatus: RequestStatusType;
};

export type TasksStateType = {
  [key: string]: Array<TaskEntityType>;
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
  | ReturnType<typeof updateTaskAC>
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ReturnType<typeof setTaskEntityStatus>;
