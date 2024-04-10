// import { Button } from "@mui/material";
// import { Button } from "./Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

type AddItemFormProps = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: AddItemFormProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [inputError, setInputError] = useState<boolean>(false);

  const onKeyDownaddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isAddTaskPosible) {
      addNewTaskHandler();
    }
  };

  const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    inputError && setInputError(false);
    setTaskTitle(e.currentTarget.value);
  };

  const addNewTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle) {
      addItem(trimmedTitle);
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
    }
    setTaskTitle("");
  };

  const maxTitleLength = 15;
  const isAddTaskPosible =
    taskTitle.length && taskTitle.length <= maxTitleLength;

  return (
    <div>
      <TextField
        
        label="Enter a title"
        variant="outlined"
        error={inputError}
        // className={inputError ? "input-error" : undefined}
        value={taskTitle}
        helperText={inputError ? "Title is required" : ""}
        size={"small"}
        onChange={setTaskTitleHandler}
        onKeyDown={onKeyDownaddNewTaskHandler}
      />
      {/* <input
        value={taskTitle}
        className={inputError ? "input-error" : undefined}
        onChange={setTaskTitleHandler}
        onKeyDown={onKeyDownaddNewTaskHandler}
      /> */}
      {/* <Button
        variant="contained"
        onClick={addNewTaskHandler}
        disabled={!isAddTaskPosible}
      >
        +
      </Button> */}
      <IconButton
        disabled={!isAddTaskPosible}
        onClick={addNewTaskHandler}
        color={"primary"}
      >
        <AddBoxIcon />
      </IconButton>

      {/* <Button
        title="+"
        onClick={addNewTaskHandler}
        isDisabled={!isAddTaskPosible}
      /> */}
      {/* {!taskTitle.length && (
        <p style={{ color: inputError ? "red" : "black" }}>Please enter text</p>
      )} */}
      {taskTitle.length > maxTitleLength && <p>Task title is too long</p>}
    </div>
  );
};
