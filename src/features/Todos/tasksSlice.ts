import { Dispatch } from "redux";
import {
  TaskType,
  UpdateDomainTaskModelType,
  todolistAPI,
} from "../../api/todolist-api";
import { AppRootStateType } from "../../app/store";
import {
  todolistsActions, // AddTodolistActionType,
  // ClearTodosDataActionType,
  // RemoveTodolistActionType,
  // SetTodolistsActionType,
} from "./todolistsSlice";
import {
  RequestStatusType,
  appActions,
  // SetAppErrorActionType,
  // SetAppStatusActionType,
  // setAppErrorAC,
  // setAppStatusAC,
} from "../../app/appSlice";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (
      state,
      action: PayloadAction<{ taskId: string; todolistId: string }>
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (index !== -1) tasks.splice(index, 1);
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      // return {
      //   ...state,
      //   [action.task.todoListId]: [
      //     {
      //       ...action.task,
      //       entityStatus: "idle",
      //     },
      //     ...state[action.task.todoListId],
      //   ],
      // };
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift({ ...action.payload.task, entityStatus: "idle" });
    },
    updateTask: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        model: Partial<UpdateDomainTaskModelType>;
      }>
    ) => {
      // return {
      //   ...state,
      //   [action.todolistId]: state[action.todolistId].map((task) =>
      //     task.id === action.taskId ? { ...task, ...action.model } : task
      //   ),
      // };
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );

      if (index !== -1)
        tasks[index] = { ...tasks[index], ...action.payload.model };
    },
    setTasks: (
      state,
      action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>
    ) => {
      // return {
      //   ...state,
      //   [action.todolistId]: action.tasks.map((task: any) => ({
      //     ...task,
      //     entityStatus: "idle",
      //   })),
      // };

      const tasks = state[action.payload.todolistId];

      action.payload.tasks.forEach((task) => {
        tasks.push({ ...task, entityStatus: "idle" });
      });
    },
    setTaskEntityStatus: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        status: RequestStatusType;
      }>
    ) => {
      // return {
      //   ...state,
      //   [action.todolistId]: state[action.todolistId].map((task) =>
      //     task.id === action.taskId
      //       ? { ...task, entityStatus: action.status }
      //       : task
      //   ),
      // };
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (index !== -1) tasks[index].entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((todo) => {
          state[todo.id] = [];
        });
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsActions.clearTodosData, (state, action) => {
        return {};
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// export const _tasksReducer = (
//   state: TasksStateType = initialState,
//   action: ActionsType
// ): TasksStateType => {
//   switch (action.type) {
//     case "SET-TODOLISTS":
//       return action.todolists.reduce((acc: any, todo: any) => {
//         acc[todo.id] = [];
//         return acc;
//       }, state);
//     case "SET-TASKS":
//       return {
//         ...state,
//         [action.todolistId]: action.tasks.map((task: any) => ({
//           ...task,
//           entityStatus: "idle",
//         })),
//       };
//     case "REMOVE-TASK":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].filter(
//           (task) => task.id !== action.taskId
//         ),
//       };
//     case "ADD-TASK":
//       return {
//         ...state,
//         [action.task.todoListId]: [
//           {
//             ...action.task,
//             entityStatus: "idle",
//           },
//           ...state[action.task.todoListId],
//         ],
//       };
//     case "UPDATE-TASK":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((task) =>
//           task.id === action.taskId ? { ...task, ...action.model } : task
//         ),
//       };
//     case "ADD-TODOLIST":
//       return {
//         ...state,
//         [action.todolist.id]: [],
//       };
//     case "REMOVE-TODOLIST":
//       // 1
//       // const copyState = { ...state };
//       // delete copyState[action.id];
//       // return copyState;

//       // 2
//       const { [action.id]: a, ...rest } = state;
//       return rest;
//     case "SET-TASK-ENTITY-STATUS":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((task) =>
//           task.id === action.taskId
//             ? { ...task, entityStatus: action.status }
//             : task
//         ),
//       };
//     case "CLEAR-DATA":
//       return {};
//     default:
//       return state;
//   }
// };

// AC
// export const removeTaskAC = (taskId: string, todolistId: string) =>
//   ({ type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId }) as const;

// export const addTaskAC = (task: TaskType) =>
//   ({ type: "ADD-TASK", task }) as const;

// export const updateTaskAC = (
//   todolistId: string,
//   taskId: string,
//   model: Partial<UpdateDomainTaskModelType>
// ) => ({ type: "UPDATE-TASK", todolistId, taskId, model }) as const;

// export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
//   ({
//     type: "SET-TASKS",
//     todolistId,
//     tasks,
//   }) as const;

// export const setTaskEntityStatus = (
//   todolistId: string,
//   taskId: string,
//   status: RequestStatusType
// ) => ({ type: "SET-TASK-ENTITY-STATUS", todolistId, taskId, status }) as const;

// TC
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistAPI
    .getTasks(todolistId)
    .then((response) => {
      if (response.data.error) {
        dispatch(appActions.setAppError({ error: response.data.error }));
        dispatch(appActions.setAppStatus({ status: "failed" }));
      } else {
        dispatch(
          tasksActions.setTasks({ todolistId, tasks: response.data.items })
        );
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(
      tasksActions.setTaskEntityStatus({
        todolistId,
        taskId,
        status: "loading",
      })
    );
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(tasksActions.removeTask({ taskId, todolistId }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const createTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistAPI
      .createTask(todolistId, title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(tasksActions.addTask({ task: response.data.data.item }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
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
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(
      tasksActions.setTaskEntityStatus({
        todolistId,
        taskId,
        status: "loading",
      })
    );
    todolistAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(tasksActions.updateTask({ todolistId, taskId, model }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
          dispatch(
            tasksActions.setTaskEntityStatus({
              todolistId,
              taskId,
              status: "succeeded",
            })
          );
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
// type ActionsType =
//   | ReturnType<typeof removeTaskAC>
//   | ReturnType<typeof addTaskAC>
//   // | AddTodolistActionType
//   // | RemoveTodolistActionType
//   // | SetTodolistsActionType
//   | ReturnType<typeof setTasksAC>
//   | ReturnType<typeof updateTaskAC>
//   // | SetAppStatusActionType
//   // | SetAppErrorActionType
//   | ReturnType<typeof setTaskEntityStatus>
//   // | ClearTodosDataActionType
//   | any;
