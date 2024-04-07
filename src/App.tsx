import { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { Task, TodoList } from "./components/TodoList";
import { AddItemForm } from "./components/AddItemForm";

export type Filter = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: Filter;
};
type TasksState = {
  [key: string]: Task[];
};

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists((prevState) =>
      prevState.filter((todolist) => todolist.id !== todolistId)
    );
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const addTodolist = (title: string) => {
    const newTodolist: TodolistType = {
      id: v1(),
      title,
      filter: "all",
    };
    setTodolists((prevState) => [newTodolist, ...prevState]);
    setTasks((prevState) => ({
      ...prevState,
      [newTodolist.id]: [],
    }));
  };

  const editTodolist = (todolistId: string, title: string) => {
    setTodolists((prevState) =>
      prevState.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, title } : todolist
      )
    );
  };

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks((prevState) => ({
      ...prevState,
      [todolistId]: prevState[todolistId].filter((task) => task.id !== taskId),
    }));
  };

  const addTask = (todolistId: string, title: string) => {
    const newTask: Task = {
      id: v1(),
      title,
      isDone: false,
    };

    setTasks((prevState) => ({
      ...prevState,
      [todolistId]: [newTask, ...prevState[todolistId]],
    }));
  };

  const editTask = (todolistId: string, taskId: string, title: string) => {
    setTasks((prevState) => ({
      ...prevState,
      [todolistId]: prevState[todolistId].map((task) =>
        task.id === taskId ? { ...task, title } : task
      ),
    }));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    newStatus: boolean
  ) => {
    setTasks((prevState) => ({
      ...prevState,
      [todolistId]: prevState[todolistId].map((task) =>
        task.id === taskId ? { ...task, isDone: newStatus } : task
      ),
    }));
  };

  const changeFilter = (todolistId: string, filter: Filter) => {
    setTodolists((prevState) =>
      prevState.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, filter } : todolist
      )
    );
  };

  const getFilteredTasks = (
    allTasks: Task[],
    currentFilter: Filter
  ): Task[] => {
    switch (currentFilter) {
      case "active":
        return allTasks.filter((task) => !task.isDone);
      case "completed":
        return allTasks.filter((task) => task.isDone);
      default:
        return allTasks;
    }
  };

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((todolist) => {
        const filteredTasks = getFilteredTasks(
          tasks[todolist.id],
          todolist.filter
        );
        return (
          <TodoList
            key={todolist.id}
            todolistId={todolist.id}
            title={todolist.title}
            filter={todolist.filter}
            tasks={filteredTasks}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            editTask={editTask}
            editTodolist={editTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
