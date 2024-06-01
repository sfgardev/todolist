import { Dispatch } from "redux";
import { TodolistType, todolistAPI } from "../../api/todolist-api";

const initialState: Array<TodolistEntityType> = [];

export const todolistsReducer = (
  state = initialState,
  action: ActionsType
): Array<TodolistEntityType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((todo) => ({ ...todo, filter: "all" }));
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);
    case "ADD-TODOLIST":
      return [{ ...action.todolist, filter: "all" }, ...state];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((todolist) =>
        todolist.id === action.id
          ? { ...todolist, title: action.title }
          : todolist
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((todolist) =>
        todolist.id === action.id
          ? { ...todolist, filter: action.filter }
          : todolist
      );
    default:
      return state;
  }
};

// AC
export const removeTodolistAC = (todolistId: string) =>
  ({ type: "REMOVE-TODOLIST", id: todolistId }) as const;

export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: "ADD-TODOLIST", todolist }) as const;

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
  ({ type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title }) as const;

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValuesType
) =>
  ({ type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter }) as const;

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({
    type: "SET-TODOLISTS",
    todolists,
  }) as const;

// TC
export const getTodolistsTC = () => {
  return (dispatch: Dispatch<ActionsType>) =>
    todolistAPI.getTodolists().then((response) => {
      dispatch(setTodolistsAC(response.data));
    });
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTodolist(todolistId).then((response) => {
      dispatch(removeTodolistAC(todolistId));
    });
  };
};

export const createTodolistTC = (title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTodolist(title).then((response) => {
      dispatch(addTodolistAC(response.data.data.item));
    });
  };
};

export const updateTodolistTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(todolistId, title).then((response) => {
      dispatch(changeTodolistTitleAC(todolistId, title));
    });
  };
};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType;

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistEntityType = TodolistType & { filter: FilterValuesType };
