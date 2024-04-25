import { v1 } from "uuid";
import { Filter, TodolistType } from "../App";

const todolistId1 = v1();
const todolistId2 = v1();

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

const initialState: TodolistType[] = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to buy", filter: "all" },
];

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.todolistId);
    case "ADD-TODOLIST":
      const newTodolist: TodolistType = {
        id: action.todolistId,
        filter: "all",
        title: action.title,
      };
      return [...state, newTodolist];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((todolist) =>
        todolist.id === action.todolistId
          ? { ...todolist, title: action.title }
          : todolist
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((todolist) =>
        todolist.id === action.todolistId
          ? { ...todolist, filter: action.filter }
          : todolist
      );
    default:
      throw new Error("I don't understand this type");
  }
};

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", todolistId } as const;
};

export const addTodolistAC = (title: string) => {
  return { type: "ADD-TODOLIST", title, todolistId: v1() } as const;
};

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", todolistId, title } as const;
};

export const changeTodolistFilterAC = (todolistId: string, filter: Filter) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    filter,
  } as const;
};
