import { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { Task, TodoList } from "./components/TodoList";

export type Filter = "all" | "active" | "completed";

function App() {
  const todoListTitle = "What to learn";
  const initState: Task[] = [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ];

  const [tasks, setTasks] = useState<Task[]>(initState);
  const [filter, setFilter] = useState<Filter>("all");

  const removeTask = (taskId: string) => {
    const updatedState = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedState);
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: v1(),
      title,
      isDone: false,
    };

    const updatedState = [newTask, ...tasks];
    setTasks(updatedState);
  };

  const changeTaskStatus = (taskId: string, newStatus: boolean) => {
    // const task = tasks.find((task) => task.id === taskId);
    // if (task) {
    //   task.isDone = !task.isDone;
    // }
    // setTasks([...tasks]);
    const updatedState = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: newStatus } : task
    );

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
        filter={filter}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
