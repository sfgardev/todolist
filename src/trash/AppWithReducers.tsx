import { useReducer } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import "./App.css";

import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { TaskPriorities, TaskStatuses } from "../api/todolist-api";
import { tasksActions, tasksReducer } from "../features/Todos/tasksSlice";
import {
  FilterValuesType,
  todolistsActions,
  // changeTodolistFilterAC,
  // changeTodolistTitleAC,
  // removeTodolistAC,
  todolistsReducer,
} from "../features/Todos/todolistsSlice";

// export type TasksStateType = {
//   [key: string]: Array<TaskType>;
// };

function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: todolistId1,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: todolistId1,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        entityStatus: "idle",
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.Completed,
        todoListId: todolistId2,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "React Book",
        status: TaskStatuses.Completed,
        todoListId: todolistId2,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        entityStatus: "idle",
      },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    const action = tasksActions.removeTask({ taskId: id, todolistId });
    dispatchToTasks(action);
  }

  function addTask(title: string, todolistId: string) {
    // const action = addTaskAC(title, todolistId);
    // dispatchToTasks(action);
  }

  function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
    // const action = changeTaskStatusAC(id, status, todolistId);
    // dispatchToTasks(action);
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    // const action = changeTaskTitleAC(id, newTitle, todolistId);
    // dispatchToTasks(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = todolistsActions.changeTodolistFilter({
      todolistId,
      filter: value,
    });
    dispatchToTodolists(action);
  }

  function removeTodolist(id: string) {
    const action = todolistsActions.removeTodolist({ todolistId: id });
    dispatchToTasks(action);
    dispatchToTodolists(action);
  }

  function changeTodolistTitle(id: string, title: string) {
    const action = todolistsActions.changeTodolistTitle({
      todolistId: id,
      title,
    });
    dispatchToTodolists(action);
  }

  function addTodolist(title: string) {
    // const action = addTodolistAC(title);
    // dispatchToTasks(action);
    // dispatchToTodolists(action);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.status === TaskStatuses.New
              );
            }
            if (tl.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.status === TaskStatuses.Completed
              );
            }

            return (
              <></>
              // <Grid key={tl.id} item>
              //   <Paper style={{ padding: "10px" }}>
              //     <Todolist
              //       key={tl.id}
              //       id={tl.id}
              //       title={tl.title}
              //       tasks={tasksForTodolist}
              //       removeTask={removeTask}
              //       changeFilter={changeFilter}
              //       addTask={addTask}
              //       changeTaskStatus={changeStatus}
              //       filter={tl.filter}
              //       removeTodolist={removeTodolist}
              //       changeTaskTitle={changeTaskTitle}
              //       changeTodolistTitle={changeTodolistTitle}
              //     />
              //   </Paper>
              // </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
