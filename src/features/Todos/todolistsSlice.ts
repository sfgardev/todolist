import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatusType, appActions } from "../../app/appSlice";
import { ResultCode } from "../../common/enum";
import {
  createAppAsyncThunk,
  handleServerAppError,
  handleServerNetworkError,
} from "../../common/utils";
import {
  TodolistType,
  UpdateTodolistArgs,
  todolistAPI,
} from "./api/todolist-api";
import { getTasks } from "./tasksSlice";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistEntityType[],
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>
    ) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId
      );
      if (index !== -1) state[index].filter = action.payload.filter;
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
    clearTodos: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((todo) => {
          state.push({ ...todo, filter: "all", entityStatus: "idle" });
        });
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todo) => todo.id === action.payload.todolistId
        );
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          entityStatus: "idle",
          filter: "all",
        });
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todo) => todo.id === action.payload.todolistId
        );
        if (index !== -1) state[index].title = action.payload.title;
      });
  },
});

export const getTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>(
  `${slice.name}/getTodolists`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const response = await todolistAPI.getTodolists();
      dispatch(appActions.setAppStatus({ status: "succeeded" }));

      response.data.forEach((todo) => {
        dispatch(getTasks(todo.id));
      });

      return { todolists: response.data };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const removeTodolist = createAsyncThunk<{ todolistId: string }, string>(
  `${slice.name}/removeTodolist`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      dispatch(
        todolistsActions.setTodolistEntityStatus({
          todolistId,
          status: "loading",
        })
      );

      const response = await todolistAPI.deleteTodolist(todolistId);

      if (response.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { todolistId };
      } else {
        handleServerAppError(response.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const createTodolist = createAppAsyncThunk<
  { todolist: TodolistType },
  string
>(`${slice.name}/createTodolist`, async (title, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));

    const response = await todolistAPI.createTodolist(title);

    if (response.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolist: response.data.data.item };
    } else {
      handleServerAppError(response.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const updateTodolist = createAppAsyncThunk<
  UpdateTodolistArgs,
  UpdateTodolistArgs
>(`${slice.name}/updateTodolist`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));

    const response = await todolistAPI.updateTodolist(arg);

    if (response.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg;
    } else {
      handleServerAppError(response.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistEntityType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
