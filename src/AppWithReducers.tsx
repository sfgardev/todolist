import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import { Reducer, useReducer, useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm";
import { MenuButton } from "./components/MenuButton";
import { Task, TodoList } from "./components/TodoList";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import {
  ActionsType,
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";

type ThemeMode = "dark" | "light";

export type Filter = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: Filter;
};
export type TasksState = {
  [key: string]: Task[];
};

function AppWithReducers() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      // primary: {
      //   main: "#a4089c",
      //   light: '#ccc'
      // },
    },
  });

  const handleThemeMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolists] = useReducer<
    Reducer<TodolistType[], ActionsType>
  >(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

  // const [todolists, setTodolists] = useState<TodolistType[]>([
  //   { id: todolistId1, title: "What to learn", filter: "all" },
  //   { id: todolistId2, title: "What to buy", filter: "all" },
  // ]);

  // const [tasks, setTasks] = useState<TasksState>({
  //   [todolistId1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //   ],
  //   [todolistId2]: [
  //     { id: v1(), title: "Rest API", isDone: true },
  //     { id: v1(), title: "GraphQL", isDone: false },
  //   ],
  // });

  const removeTodolist = (todolistId: string) => {
    // setTodolists((prevState) =>
    //   prevState.filter((todolist) => todolist.id !== todolistId)
    // );
    // delete tasks[todolistId];
    // setTasks({ ...tasks });
    const action = removeTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const addTodolist = (title: string) => {
    // const newTodolist: TodolistType = {
    //   id: v1(),
    //   title,
    //   filter: "all",
    // };
    // setTodolists((prevState) => [newTodolist, ...prevState]);
    // setTasks((prevState) => ({
    //   ...prevState,
    //   [newTodolist.id]: [],
    // }));
    const action = addTodolistAC(title);
    dispatchToTasks(action);
    dispatchToTodolists(action);
  };

  const editTodolist = (todolistId: string, title: string) => {
    // setTodolists((prevState) =>
    //   prevState.map((todolist) =>
    //     todolist.id === todolistId ? { ...todolist, title } : todolist
    //   )
    // );
    dispatchToTodolists(changeTodolistTitleAC(todolistId, title));
  };

  const removeTask = (todolistId: string, taskId: string) => {
    // setTasks((prevState) => ({
    //   ...prevState,
    //   [todolistId]: prevState[todolistId].filter((task) => task.id !== taskId),
    // }));
    const action = removeTaskAC(taskId, todolistId);
    dispatchToTasks(action);
  };

  const addTask = (todolistId: string, title: string) => {
    // const newTask: Task = {
    //   id: v1(),
    //   title,
    //   isDone: false,
    // };

    // setTasks((prevState) => ({
    //   ...prevState,
    //   [todolistId]: [newTask, ...prevState[todolistId]],
    // }));
    dispatchToTasks(addTaskAC(title, todolistId));
  };

  const editTask = (todolistId: string, taskId: string, title: string) => {
    // setTasks((prevState) => ({
    //   ...prevState,
    //   [todolistId]: prevState[todolistId].map((task) =>
    //     task.id === taskId ? { ...task, title } : task
    //   ),
    // }));
    dispatchToTasks(changeTaskTitleAC(taskId, title, todolistId));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    newStatus: boolean
  ) => {
    // setTasks((prevState) => ({
    //   ...prevState,
    //   [todolistId]: prevState[todolistId].map((task) =>
    //     task.id === taskId ? { ...task, isDone: newStatus } : task
    //   ),
    // }));

    dispatchToTasks(changeTaskStatusAC(taskId, newStatus, todolistId));
  };

  const changeFilter = (todolistId: string, filter: Filter) => {
    // setTodolists((prevState) =>
    //   prevState.map((todolist) =>
    //     todolist.id === todolistId ? { ...todolist, filter } : todolist
    //   )
    // );
    dispatchToTodolists(changeTodolistFilterAC(todolistId, filter));
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton background={theme.palette.primary.dark}>
              Login
            </MenuButton>
            <MenuButton background={theme.palette.primary.dark}>
              Logout
            </MenuButton>
            <MenuButton>Faq</MenuButton>
            <Switch onChange={handleThemeMode} color="default" />
          </div>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container sx={{ mb: 2 }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          {/* {todolists.map((todolist) => {
            const filteredTasks = getFilteredTasks(
              tasks[todolist.id],
              todolist.filter
            );
            return (
              <Grid key={todolist.id} item>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <TodoList
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
                </Paper>
              </Grid>
            );
          })} */}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AppWithReducers;
