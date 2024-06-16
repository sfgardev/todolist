import { Grid, Paper } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  AppRootStateType,
  useAppDispatch,
  useAppSelector,
} from "../../app/store";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { TasksStateType, createTaskTC } from "./tasks-reducer";
import {
  TodolistEntityType,
  getTodolistsTC,
  FilterValuesType,
  changeTodolistFilterAC,
  removeTodolistTC,
  updateTodolistTC,
  createTodolistTC,
} from "./todolists-reducer";
import { Navigate } from "react-router-dom";

type TodosProps = {
  demo?: boolean;
};

export const Todos = ({ demo = false }: TodosProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const todolists = useSelector<AppRootStateType, Array<TodolistEntityType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) return;

    dispatch(getTodolistsTC());
  }, []);

  const addTask = useCallback(
    function (title: string, todolistId: string) {
      // const action = addTaskAC(title, todolistId);
      // dispatch(action);
      dispatch(createTaskTC(todolistId, title));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    function (value: FilterValuesType, todolistId: string) {
      const action = changeTodolistFilterAC(todolistId, value);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    function (id: string) {
      // const action = removeTodolistAC(id);
      // dispatch(action);
      dispatch(removeTodolistTC(id));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      // const action = changeTodolistTitleAC(id, title);
      // dispatch(action);
      dispatch(updateTodolistTC(id, title));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    function (title: string) {
      // const action = addTodolistAC(title);
      // dispatch(action);
      dispatch(createTodolistTC(title));
    },
    [dispatch]
  );

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  id={tl.id}
                  title={tl.title}
                  tasks={tasks[tl.id]}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  entityStatus={tl.entityStatus}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
