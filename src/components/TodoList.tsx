import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, TodolistType } from "../App";
import { AppRootStateType } from "../state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../state/tasks-reducer";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "../state/todolists-reducer";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { filterButtonContainerSx, getListItemSx } from "./Todolist.styles";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListProps = {
  todolist: TodolistType;
};

export const TodoList = ({ todolist }: TodoListProps) => {
  // const todolist1 = useSelector<AppRootStateType, TodolistType>(
  //   (state) =>
  //     state.todolists.find((todo) => todo.id === todolist.id) as TodolistType
  // );

  // const todolist2 = useSelector<AppRootStateType, TodolistType>(
  //   (state) => state.todolists.filter((todo) => todo.id === todolist.id)[0]
  // );

  // const tasks2 = useSelector<AppRootStateType, Task[]>(
  //   (state) => state.tasks[todolist.id]
  // );

  // console.log(tasks2);

  const { id, filter, title } = todolist;

  const tasks = useSelector<AppRootStateType, Task[]>(
    (state) => state.tasks[id]
  );

  const dispatch = useDispatch();

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

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC(title, id));
  };

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id));
  };

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(id, title));
  };

  const changeTaskTitleHandler = (taskId: string, title: string) =>
    dispatch(changeTaskTitleAC(taskId, title, id));

  const changeFilterHandlerCreator = (filter: Filter) => {
    return () => dispatch(changeTodolistFilterAC(id, filter));
  };

  return (
    <div className="todolist">
      <div className="todolist-header">
        <h3>
          <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addTaskHandler} />

      {filteredTasks.length === 0 ? (
        <span>Empty list</span>
      ) : (
        <List>
          {filteredTasks.map((task) => {
            const removeTaskHandler = () => dispatch(removeTaskAC(task.id, id));
            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
              dispatch(
                changeTaskStatusAC(task.id, e.currentTarget.checked, id)
              );

            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeStatusHandler}
                  />
                  <EditableSpan
                    title={task.title}
                    className={task.isDone ? "task-done" : "task"}
                    onChange={(title) => changeTaskTitleHandler(task.id, title)}
                  />
                </div>
                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}

      <Box sx={filterButtonContainerSx}>
        <Button
          variant={filter === "all" ? "outlined" : "contained"}
          color="secondary"
          onClick={changeFilterHandlerCreator("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="error"
          onClick={changeFilterHandlerCreator("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "contained"}
          color="primary"
          onClick={changeFilterHandlerCreator("completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
