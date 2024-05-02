import { v1 } from "uuid";
import { Filter, TasksState } from "../App";
import { Task } from "../components/TodoList";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: { id: string; title: string };
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: { id: string; filter: Filter };
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const initialTasksState = {
  // [todolistId1]: [
  //   { id: v1(), title: "HTML&CSS", isDone: true },
  //   { id: v1(), title: "JS", isDone: true },
  //   { id: v1(), title: "ReactJS", isDone: false },
  // ],
  // [todolistId2]: [
  //   { id: v1(), title: "Rest API", isDone: true },
  //   { id: v1(), title: "GraphQL", isDone: false },
  // ],
};

export const tasksReducer = (
  state: TasksState = initialTasksState,
  action: ActionsType
): TasksState => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      const newTask: Task = {
        id: v1(),
        isDone: false,
        title: action.title,
      };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };

    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, isDone: action.isDone } : task
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, title: action.title } : task
        ),
      };
    case "ADD-TODOLIST":
      return { ...state, [action.todolistId]: [] };
    case "REMOVE-TODOLIST":
      // const { [action.todolistId]: a, ...restState } = state;
      // return restState;
      const updatedState = { ...state };
      delete updatedState[action.todolistId];
      return updatedState;
    default:
      // throw new Error("I don't understand this type");
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASK", taskId, todolistId } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
  return { type: "ADD-TASK", title, todolistId } as const;
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
) => {
  return { type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId } as const;
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
) => {
  return { type: "CHANGE-TASK-TITLE", taskId, title, todolistId } as const;
};
