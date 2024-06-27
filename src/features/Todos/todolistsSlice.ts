import { Dispatch } from "redux";
import { TodolistType, todolistAPI } from "../../api/todolist-api";
import {
  RequestStatusType,
  appActions,
  // SetAppStatusActionType,
  // setAppStatusAC,
} from "../../app/appSlice";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { getTasksTC } from "./tasksSlice";
import { AppThunkDispatch } from "../../app/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistEntityType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId
      );
      if (index !== -1) state.splice(index, 1);
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({
        ...action.payload.todolist,
        entityStatus: "idle",
        filter: "all",
      });
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ todolistId: string; title: string }>
    ) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId
      );
      if (index !== -1) state[index].title = action.payload.title;
    },
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>
    ) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId
      );
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    setTodolists: (
      state,
      action: PayloadAction<{ todolists: TodolistType[] }>
    ) => {
      // return action.payload.todolists.map((todo) => ({
      //   ...todo,
      //   filter: "all",
      //   entityStatus: "idle",
      // }));

      action.payload.todolists.forEach((todo) => {
        state.push({ ...todo, filter: "all", entityStatus: "idle" });
      });
    },
    setTodolistEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; status: RequestStatusType }>
    ) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId
      );
      if (index !== -1) state[index].entityStatus = action.payload.status;
    },
    clearTodosData: (state) => {
      return [];
    },
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

const initialState: Array<TodolistEntityType> = [];

export const _todolistsReducer = (
  state = initialState,
  action: any
): Array<TodolistEntityType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((todo: any) => ({
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
    case "CLEAR-DATA":
      return [];
    default:
      return state;
  }
};

// AC
// export const removeTodolistAC = (todolistId: string) =>
//   ({ type: "REMOVE-TODOLIST", id: todolistId }) as const;

// export const addTodolistAC = (todolist: TodolistType) =>
//   ({ type: "ADD-TODOLIST", todolist }) as const;

// export const changeTodolistTitleAC = (todolistId: string, title: string) =>
//   ({ type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title }) as const;

// export const changeTodolistFilterAC = (
//   todolistId: string,
//   filter: FilterValuesType
// ) =>
//   ({ type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter }) as const;

// export const setTodolistsAC = (todolists: TodolistType[]) =>
//   ({
//     type: "SET-TODOLISTS",
//     todolists,
//   }) as const;

// export const setTodolistEntityStatusAC = (
//   todolistId: string,
//   status: RequestStatusType
// ) =>
//   ({
//     type: "SET-TODOLIST-ENTITY-STATUS",
//     todolistId,
//     status,
//   }) as const;

// export const clearTodosDataAC = () => ({ type: "CLEAR-DATA" }) as const;

// TC
export const getTodolistsTC = () => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistAPI
      .getTodolists()
      .then((response) => {
        dispatch(todolistsActions.setTodolists({ todolists: response.data }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return response.data;
      })
      .then((todos) => {
        todos.forEach((todo) => {
          dispatch(getTasksTC(todo.id));
        });
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(
      todolistsActions.setTodolistEntityStatus({
        todolistId: todolistId,
        status: "loading",
      })
    );
    todolistAPI
      .deleteTodolist(todolistId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(todolistsActions.removeTodolist({ todolistId }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
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
  return (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistAPI
      .createTodolist(title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(
            todolistsActions.addTodolist({ todolist: response.data.data.item })
          );
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
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
  return (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(todolistsActions.changeTodolistTitle({ todolistId, title }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
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
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
// export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>;

// type ActionsType =
//   | RemoveTodolistActionType
//   | AddTodolistActionType
//   | ReturnType<typeof changeTodolistTitleAC>
//   | ReturnType<typeof changeTodolistFilterAC>
//   | SetTodolistsActionType
//   // | SetAppStatusActionType
//   | ReturnType<typeof setTodolistEntityStatusAC>
//   | ClearTodosDataActionType;

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistEntityType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
