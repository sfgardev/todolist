import React, { useState } from "react";
import "./App.css";
import { Task, TodoList } from "./components/TodoList";

export type Filter = "all" | "active" | "completed";

function App() {
  const todoListTitle = "What to learn";
  // const tasks: Task[] = [
  //   { id: 1, title: "HTML&CSS", isDone: true },
  //   { id: 2, title: "JS", isDone: true },
  //   { id: 3, title: "ReactJS", isDone: false },
  // ];

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
  ]);
  const [filter, setFilter] = useState<Filter>("all");

  const removeTask = (taskId: number) => {
    const updatedState = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedState);
  };

  const changeFilter = (filter: Filter) => {
    setFilter(filter);
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

  const filteredTasks = getFilteredTasks(tasks, filter);

  return (
    <div className="App">
      <TodoList
        title={todoListTitle}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
