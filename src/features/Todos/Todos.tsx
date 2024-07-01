import { Grid, Paper } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  AppRootStateType,
  useAppDispatch,
  useAppSelector,
} from "../../app/store";
import { Todolist } from "./Todolist/Todolist";
import { TasksStateType, createTask } from "./tasksSlice";
import {
  TodolistEntityType,
  getTodolists,
  FilterValuesType,
  removeTodolist,
  updateTodolist,
  createTodolist,
  todolistsActions,
} from "./todolistsSlice";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../Login/authSlice";
import { AddItemForm } from "../../common/components";

type TodosProps = {
  demo?: boolean;
};

export const Todos = ({ demo = false }: TodosProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const todolists = useSelector<AppRootStateType, Array<TodolistEntityType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) return;

    dispatch(getTodolists());
  }, []);

  const addTask = useCallback(
    function (title: string, todolistId: string) {
      // const action = addTaskAC(title, todolistId);
      // dispatch(action);
      dispatch(createTask({ todolistId, title }));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    function (value: FilterValuesType, todolistId: string) {
      const action = todolistsActions.changeTodolistFilter({
        todolistId,
        filter: value,
      });
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodolistHandler = useCallback(
    function (id: string) {
      // const action = removeTodolistAC(id);
      // dispatch(action);
      dispatch(removeTodolist(id));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      // const action = changeTodolistTitleAC(id, title);
      // dispatch(action);
      dispatch(updateTodolist({ todolistId: id, title }));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    function (title: string) {
      // const action = addTodolistAC(title);
      // dispatch(action);
      dispatch(createTodolist(title));
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
                  removeTodolist={removeTodolistHandler}
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
