import { ReactNode } from "react";
import { Provider } from "react-redux";
import { AppRootStateType, store } from "./store";
import { combineReducers, legacy_createStore } from "redux";
import { v1 } from "uuid";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todolist-api";

const rootReducer = combineReducers({
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
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
    },
  ],
  tasks: {
    // todolistId1: [
    //   { id: v1(), title: "HTML&CSS", isDone: true },
    //   { id: v1(), title: "JS", isDone: false },
    // ],
    // todolistId2: [
    //   { id: v1(), title: "Milk", isDone: false },
    //   { id: v1(), title: "React Book", isDone: true },
    // ],
    todolistId1: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todolistId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todolistId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.Completed,
        todolistId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
      },
      {
        id: v1(),
        title: "React Book",
        status: TaskStatuses.Completed,
        todolistId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
      },
    ],
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

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as any
);

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
