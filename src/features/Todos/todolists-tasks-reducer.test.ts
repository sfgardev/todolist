// import { TasksStateType, TodolistType } from "../App";
import {
  TodolistEntityType,
  todolistsActions,
  // addTodolistAC,
  todolistsReducer,
} from "./todolistsSlice";
import { tasksReducer } from "./tasksSlice";
import { TasksStateType } from "./tasksSlice";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistEntityType> = [];

  const action = todolistsActions.addTodolist({
    todolist: {
      addedDate: "",
      id: "1",
      order: 0,
      title: "new todolist",
    },
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
