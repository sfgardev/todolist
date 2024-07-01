import { ReactNode } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { tasksReducer } from "../features/Todos/tasksSlice";
import { todolistsReducer } from "../features/Todos/todolistsSlice";
import { appReducer } from "./appSlice";
import { AppRootStateType } from "./store";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../common/enum/enum";

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "loading",
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        entityStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "React Book",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        entityStatus: "idle",
      },
    ],
  },
  app: {
    status: "idle",
    error: null,
    isInitialized: false,
  },
  auth: {
    isLoggedIn: false,
  },
};

// export const storyBookStore = legacy_createStore(
//   rootReducer,
//   initialGlobalState as AppRootStateType
// );

// export const storyBookStore = legacy_createStore(
//   rootReducer,
//   initialGlobalState as ReturnType<typeof rootReducer>
// );

// @ts-ignore
export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as any,
  applyMiddleware(thunk)
);

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
