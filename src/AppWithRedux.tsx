import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm";
import { MenuButton } from "./components/MenuButton";
import { Task, TodoList } from "./components/TodoList";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { addTodolistAC } from "./state/todolists-reducer";

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

function AppWithRedux() {
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

  const todolists = useSelector<AppRootStateType, TodolistType[]>(
    (state) => state.todolists
  );
  // const tasks = useSelector<AppRootStateType, TasksState>(
  //   (state) => state.tasks
  // );

  const dispatch = useDispatch();

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
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
          {todolists.map((todolist) => {
            return (
              <Grid key={todolist.id} item>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <TodoList todolist={todolist} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AppWithRedux;
