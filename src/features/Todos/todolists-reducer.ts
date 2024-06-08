import { Dispatch } from "redux";
import { TodolistType, todolistAPI } from "../../api/todolist-api";
import {
  RequestStatusType,
  SetAppStatusActionType,
  setAppStatusAC,
} from "../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

const initialState: Array<TodolistEntityType> = [];

export const todolistsReducer = (
  state = initialState,
  action: ActionsType
): Array<TodolistEntityType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((todo) => ({
        ...todo,
        filter: "all",
        entityStatus: "idle",
      }));
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);
    case "ADD-TODOLIST":
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];
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
    case "SET-TODOLIST-ENTITY-STATUS":
      return state.map((todolist) =>
        todolist.id === action.todolistId
          ? { ...todolist, entityStatus: action.status }
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

export const setTodolistEntityStatusAC = (
  todolistId: string,
  status: RequestStatusType
) =>
  ({
    type: "SET-TODOLIST-ENTITY-STATUS",
    todolistId,
    status,
  }) as const;

// TC
export const getTodolistsTC = () => {
  return (dispatch: Dispatch<ActionsType>) =>
    todolistAPI
      .getTodolists()
      .then((response) => {
        dispatch(setTodolistsAC(response.data));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
};

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(setTodolistEntityStatusAC(todolistId, "loading"));
    todolistAPI
      .deleteTodolist(todolistId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(removeTodolistAC(todolistId));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const createTodolistTC = (title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .createTodolist(title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(addTodolistAC(response.data.data.item));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const updateTodolistTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(changeTodolistTitleAC(todolistId, title));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
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
  | SetTodolistsActionType
  | SetAppStatusActionType
  | ReturnType<typeof setTodolistEntityStatusAC>;

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistEntityType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
