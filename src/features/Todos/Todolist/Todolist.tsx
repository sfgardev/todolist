import { Delete } from "@mui/icons-material";
import { Button, ButtonProps, IconButton } from "@mui/material";
import { memo, useCallback, useEffect, useMemo } from "react";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "../../../api/todolist-api";
import { FilterValuesType } from "../todolists-reducer";
import { useAppDispatch } from "../../../app/store";
import { getTasksTC } from "../tasks-reducer";

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
};

export const Todolist = memo(function (props: PropsType) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(props.id));
  }, []);

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

  const memoTasks = useMemo(() => {
    if (props.filter === "active") {
      return props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
      return props.tasks.filter((t) => t.status === TaskStatuses.Completed);
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
          <Task key={task.id} task={task} todolistId={props.id} />
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
  return (
    <Button variant={variant} onClick={onClick} color={color}>
      {title}
    </Button>
  );
});
