import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RequestStatusType, appActions } from "../../app/appSlice";
import { ResultCode } from "../../common/enum";
import {
  createAppAsyncThunk,
  handleServerAppError,
  handleServerNetworkError,
} from "../../common/utils";
import {
  CreateTaskArgs,
  TaskType,
  UpdateDomainTaskModelType,
  UpdateTaskArgs,
  todolistAPI,
} from "./api/todolist-api";
import { createTodolist, getTodolists, removeTodolist } from "./todolistsSlice";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    setTaskEntityStatus: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        status: RequestStatusType;
      }>
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (index !== -1) tasks[index].entityStatus = action.payload.status;
    },
    clearTasks: () => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((todo) => {
          state[todo.id] = [];
        });
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];

        action.payload.tasks.forEach((task) => {
          tasks.push({ ...task, entityStatus: "idle" });
        });
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift({ ...action.payload.task, entityStatus: "idle" });
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(
          (task) => task.id === action.payload.taskId
        );

        if (index !== -1)
          tasks[index] = { ...tasks[index], ...action.payload.model };
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(
          (task) => task.id === action.payload.taskId
        );
        if (index !== -1) tasks.splice(index, 1);
      });
  },
});

export const getTasks = createAppAsyncThunk<
  { todolistId: string; tasks: TaskType[] },
  string
>(`${slice.name}/getTasks`, async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const response = await todolistAPI.getTasks(todolistId);

    if (response.data.error) {
      dispatch(appActions.setAppError({ error: response.data.error }));
      dispatch(appActions.setAppStatus({ status: "failed" }));
      return rejectWithValue(null);
    } else {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolistId, tasks: response.data.items };
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const createTask = createAppAsyncThunk<
  { task: TaskType },
  CreateTaskArgs
>(`${slice.name}/createTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const response = await todolistAPI.createTask(arg);

    if (response.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { task: response.data.data.item };
    } else {
      handleServerAppError(response.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const { model, taskId, todolistId } = arg;

    try {
      const tasks = getState().tasks;
      const task = tasks[todolistId].find((task) => task.id === taskId);

      if (!task) return rejectWithValue(null);

      const apiModel: UpdateDomainTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...model,
      };

      const response = await todolistAPI.updateTask({
        todolistId,
        taskId,
        model: apiModel,
      });

      if (response.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        dispatch(
          tasksActions.setTaskEntityStatus({
            todolistId: todolistId,
            taskId: taskId,
            status: "succeeded",
          })
        );
        return arg;
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

export const removeTask = createAppAsyncThunk<
  any,
  { todolistId: string; taskId: string }
>(`${slice.name}/removeTask}`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const { taskId, todolistId } = arg;

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(
      tasksActions.setTaskEntityStatus({
        todolistId,
        taskId,
        status: "loading",
      })
    );
    const response = await todolistAPI.deleteTask({ todolistId, taskId });
    if (response.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { taskId, todolistId };
    } else {
      handleServerAppError(response.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// types
export type TaskEntityType = TaskType & {
  entityStatus: RequestStatusType;
};

export type TasksStateType = {
  [key: string]: Array<TaskEntityType>;
};
