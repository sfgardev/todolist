import { todolistsActions } from "./todolistsSlice";
import {
  TasksStateType,
  // setTaskEntityStatus,
  tasksActions,
} from "./tasksSlice";
import { TaskPriorities, TaskStatuses } from "../../api/todolist-api";
import {
  // addTaskAC,
  // removeTaskAC,
  tasksReducer,
  // updateTaskAC,
} from "./tasksSlice";
import {} from // addTodolistAC,
// removeTodolistAC,
"./todolistsSlice";

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
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
        id: "2",
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
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
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
      // { id: "1", title: "bread", isDone: false },
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
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
        id: "2",
        title: "milf",
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
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
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
  };
});

test("correct task should be deleted from correct array", () => {
  const action = tasksActions.removeTask({
    taskId: "2",
    todolistId: "todolistId2",
  });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});
test("correct task should be added to correct array", () => {
  const action = tasksActions.addTask({
    task: {
      id: "1",
      todoListId: "todolistId2",
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: 0,
      startDate: "",
      status: 0,
      title: "juce",
    },
  });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test("status of specified task should be changed", () => {
  const action = tasksActions.updateTask({
    todolistId: "todolistId2",
    taskId: "2",
    model: { status: TaskStatuses.New },
  });
  // const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test("title of specified task should be changed", () => {
  const action = tasksActions.updateTask({
    todolistId: "todolistId2",
    taskId: "2",
    model: { title: "yogurt" },
  });
  // const action = updateTaskAC("2", "yogurt", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("yogurt");
  expect(endState["todolistId2"][0].title).toBe("bread");
});
test("new array should be added when new todolist is added", () => {
  const action = todolistsActions.addTodolist({
    todolist: {
      addedDate: "",
      id: "1",
      order: 0,
      title: "new todolist",
    },
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("propertry with todolistId should be deleted", () => {
  const action = todolistsActions.removeTodolist({ todolistId: "todolistId2" });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
test("correct task entity status should be set", () => {
  const endState = tasksReducer(
    startState,
    tasksActions.setTaskEntityStatus({
      todolistId: "todolistId1",
      taskId: "2",
      status: "loading",
    })
  );

  expect(endState["todolistId1"][1].entityStatus).toBe("loading");
});
