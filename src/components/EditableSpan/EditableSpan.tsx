import React, { ChangeEvent, memo, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
  value: string;
  disabled?: boolean;
  onChange: (newValue: string) => void;
};

export const EditableSpan = memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      disabled={props.disabled}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
