import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { ChangeEvent, memo, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";
import { useDispatch } from "react-redux";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { TaskStatuses, TaskType } from "./api/todolist-api";

type TaskProps = {
  task: TaskType;
  todolistId: string;
  //   removeTask: (taskId: string, todolistId: string) => void;
  //   changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  //   changeTaskTitle: (
  //     taskId: string,
  //     newTitle: string,
  //     todolistId: string
  //   ) => void;
};

export const Task = memo((props: TaskProps) => {
  console.log("Task");

  const dispatch = useDispatch();

  //props.removeTask(props.task.id, props.todolistId)
  const onClickHandler = useCallback(
    () => dispatch(removeTaskAC(props.task.id, props.todolistId)),
    [props.task.id, props.todolistId, dispatch]
  );

  //props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
        ? TaskStatuses.Completed
        : TaskStatuses.New;
      dispatch(
        changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId)
      );
    },
    [props.task.id, props.todolistId, dispatch]
  );

  //props.changeTaskTitle(props.task.id, newValue, props.todolistId)
  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },
    [props.task.id, props.todolistId, dispatch]
  );

  return (
    <div
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color="primary"
        onChange={onChangeHandler}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
