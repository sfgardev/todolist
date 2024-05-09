import { Delete } from "@mui/icons-material";
import { Button, ButtonProps, IconButton } from "@mui/material";
import { memo, useCallback, useMemo } from "react";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
};

export const Todolist = memo(function (props: PropsType) {
  console.log("Todolist");

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title);
    },
    [props.changeTodolistTitle, props.id]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  // let tasks = props.tasks;

  const memoTasks = useMemo(() => {
    console.log("useMemo");
    if (props.filter === "active") {
      return props.tasks.filter((t) => t.isDone === false);
    }
    if (props.filter === "completed") {
      return props.tasks.filter((t) => t.isDone === true);
    }

    return props.tasks;
  }, [props.tasks, props.filter]);

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {memoTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            todolistId={props.id}
            // changeTaskStatus={props.changeTaskStatus}
            // changeTaskTitle={props.changeTaskTitle}
            // removeTask={props.removeTask}
          />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <MyButton
          title="All"
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        />

        <MyButton
          title="Active"
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        />
        <MyButton
          title="Completed"
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        />
      </div>
    </div>
  );
});

type MyButtonProps = {
  // title: string;
} & ButtonProps;

// const MyButton = memo(function ({
//   buttonCaption,
//   ...props
// }: PropsWithChildren<MyButtonProps>) {
//   console.log("MyButton");
//   return <Button {...props}>{buttonCaption}</Button>;
// });
const MyButton = memo(({ variant, color, title, onClick }: MyButtonProps) => {
  console.log("MyButton");
  return (
    <Button variant={variant} onClick={onClick} color={color}>
      {title}
    </Button>
  );
});
