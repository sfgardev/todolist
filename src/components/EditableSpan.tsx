import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanProps = {
  title: string;
  className?: string;
  onChange: (title: string) => void;
};

export const EditableSpan = ({
  title,
  className,
  onChange,
}: EditableSpanProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleStartEdit = () => {
    setText(title);
    setIsEdit(true);
  };

  const handleStopEdit = () => {
    onChange(text);
    setIsEdit(false);
  };

  // const handleInputFocus = (node: HTMLInputElement | null) => {
  //   node?.focus();
  //   console.log("focus");
  // };

  return isEdit ? (
    <TextField
      label="Enter a title"
      variant="outlined"
      value={text}
      // ref={handleInputFocus}
      size={"small"}
      onChange={handleChange}
      onBlur={handleStopEdit}
      autoFocus
    />
  ) : (
    // <input
    //   type="text"
    //   value={text}
    //   ref={handleInputFocus}
    //   onChange={handleChange}
    //   onBlur={handleStopEdit}
    // />
    <span className={className} onDoubleClick={handleStartEdit}>
      {title}
    </span>
  );
};
