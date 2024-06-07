import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { ChangeEvent, memo, useCallback } from "react";
import { TaskStatuses, TaskType } from "../../../../api/todolist-api";
import { useAppDispatch } from "../../../../app/store";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import { removeTaskTC, updateTaskTC } from "../../tasks-reducer";

type TaskProps = {
  task: TaskType;
  todolistId: string;
};

export const Task = memo((props: TaskProps) => {
  const dispatch = useAppDispatch();

  //props.removeTask(props.task.id, props.todolistId)
  const onClickHandler = useCallback(() => {
    // dispatch(removeTaskAC(props.task.id, props.todolistId));
    dispatch(removeTaskTC(props.todolistId, props.task.id));
  }, [props.task.id, props.todolistId, dispatch]);

  //props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
        ? TaskStatuses.Completed
        : TaskStatuses.New;
      // dispatch(
      //   changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId)
      // );
      dispatch(
        updateTaskTC(props.todolistId, props.task.id, {
          status: newIsDoneValue,
        })
      );
    },
    [props.task.id, props.todolistId, dispatch]
  );

  //props.changeTaskTitle(props.task.id, newValue, props.todolistId)
  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      // dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
      dispatch(
        updateTaskTC(props.todolistId, props.task.id, { title: newValue })
      );
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
