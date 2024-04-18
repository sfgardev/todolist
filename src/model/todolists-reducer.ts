import { v1 } from "uuid";
import { Filter, TodolistType } from "../App";

const todolistId1 = v1();
const todolistId2 = v1();

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  payload: { id: string };
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: { title: string };
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: { id: string; title: string };
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: { id: string; filter: Filter };
};

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
      return state.filter((todolist) => todolist.id !== action.payload.id);
    case "ADD-TODOLIST":
      const newTodolist: TodolistType = {
        id: v1(),
        filter: "all",
        title: action.payload.title,
      };
      return [...state, newTodolist];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((todolist) =>
        todolist.id === action.payload.id
          ? { ...todolist, title: action.payload.title }
          : todolist
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((todolist) =>
        todolist.id === action.payload.id
          ? { ...todolist, filter: action.payload.filter }
          : todolist
      );
    default:
      throw new Error("I don't understand this type");
  }
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", payload: { id } };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", payload: { title } };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { id, title } };
};

export const changeTodolistFilterAC = (
  id: string,
  filter: Filter
): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id,
      filter,
    },
  };
};
