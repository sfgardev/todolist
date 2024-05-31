// import { TasksStateType, TodolistType } from "../App";
import {
  TodolistEntityType,
  addTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import { TasksStateType } from "../App";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistEntityType> = [];

  const action = addTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
