import {
  createTodolist,
  removeTodolist,
  todolistsActions,
} from "./todolistsSlice";
import {
  TasksStateType,
  createTask,
  getTasks,
  removeTask,
  tasksActions,
  updateTask,
} from "./tasksSlice";
import { tasksReducer } from "./tasksSlice";
import { Action } from "../../common/types";
import { TaskPriorities, TaskStatuses } from "../../common/enum";

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
  const action: Action<typeof removeTask.fulfilled> = {
    type: removeTask.fulfilled.type,
    payload: {
      taskId: "2",
      todolistId: "todolistId2",
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});
test("correct task should be added to correct array", () => {
  const action: Action<typeof createTask.fulfilled> = {
    type: createTask.fulfilled.type,
    payload: {
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
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test("status of specified task should be changed", () => {
  const action: Action<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: "2",
      model: { status: TaskStatuses.New },
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test("title of specified task should be changed", () => {
  const action: Action<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: "2",
      model: { title: "yogurt" },
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("yogurt");
  expect(endState["todolistId2"][0].title).toBe("bread");
});
test("new array should be added when new todolist is added", () => {
  const action: Action<typeof createTodolist.fulfilled> = {
    type: createTodolist.fulfilled.type,
    payload: {
      todolist: {
        addedDate: "",
        id: "1",
        order: 0,
        title: "new todolist",
      },
    },
  };

  // const action = todolistsActions.addTodolist({
  //   todolist: {
  //     addedDate: "",
  //     id: "1",
  //     order: 0,
  //     title: "new todolist",
  //   },
  // });

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
  const action: Action<typeof removeTodolist.fulfilled> = {
    type: removeTodolist.fulfilled.type,
    payload: { todolistId: "todolistId2" },
  };

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
test("tasks should be added for todolist", () => {
  const action: Action<typeof getTasks.fulfilled> = {
    type: getTasks.fulfilled.type,
    payload: {
      tasks: startState["todolistId1"],
      todolistId: "todolistId1",
    },
  };

  const _action = getTasks.fulfilled(
    {
      tasks: startState["todolistId1"],
      todolistId: "todolistId1",
    },
    "requestId",
    "todolistId1"
  );

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  );

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});
