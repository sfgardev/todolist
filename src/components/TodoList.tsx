import { ChangeEvent } from "react";
import { Filter } from "../App";
import { AddItemForm } from "./AddItemForm";
// import { Button } from "./Button";
import { EditableSpan } from "./EditableSpan";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { filterButtonContainerSx, getListItemSx } from "./Todolist.styles";

type TodoListProps = {
  todolistId: string;
  filter: Filter;
  title: string;
  tasks: Task[];
  removeTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolist: string, filter: Filter) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    newStatus: boolean
  ) => void;
  editTask: (todolistId: string, taskId: string, title: string) => void;
  removeTodolist: (todolistId: string) => void;
  editTodolist: (todolistId: string, title: string) => void;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodoList = ({
  todolistId,
  title,
  tasks,
  filter,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  removeTodolist,
  editTask,
  editTodolist,
}: TodoListProps) => {
  const editTaskHandler = (taskId: string, title: string) =>
    editTask(todolistId, taskId, title);

  let tasksList;
  if (tasks.length === 0) {
    tasksList = <span>Empty list</span>;
  } else {
    tasksList = (
      <List>
        {tasks.map((task) => {
          const removeTaskHandler = () => removeTask(todolistId, task.id);
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(todolistId, task.id, e.currentTarget.checked);
          // const editTaskHandler = (title: string) =>
          //   editTask(todolistId, task.id, title);

          return (
            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
              <div>
                <Checkbox
                  checked={task.isDone}
                  onChange={changeStatusHandler}
                />
                {/* <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeStatusHandler}
              /> */}

                <EditableSpan
                  title={task.title}
                  className={task.isDone ? "task-done" : "task"}
                  onChange={(title) => editTaskHandler(task.id, title)}
                />
              </div>
              <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon />
              </IconButton>
              {/* <Button onClick={removeTaskHandler} title="x" /> */}
            </ListItem>
          );
        })}
      </List>
    );
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title);
  };

  const editTodolistHandler = (title: string) => {
    editTodolist(todolistId, title);
  };

  const changeFilterHandlerCreator = (filter: Filter) => {
    return () => changeFilter(todolistId, filter);
  };

  return (
    <div className="todolist">
      <div className="todolist-header">
        <h3>
          <EditableSpan title={title} onChange={editTodolistHandler} />
        </h3>
        {/* <TodoListHeader title={title} /> */}
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
        {/* <Button onClick={removeTodolistHandler} title="x" /> */}
      </div>
      <AddItemForm addItem={addTaskHandler} />
      {tasksList}
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
        {/* <Button
          className={filter === "all" ? "active-filter" : undefined}
          title="All"
          onClick={changeFilterHandlerCreator("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : undefined}
          title="Active"
          onClick={changeFilterHandlerCreator("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : undefined}
          title="Completed"
          onClick={changeFilterHandlerCreator("completed")}
        /> */}
      </Box>
    </div>
  );
};
