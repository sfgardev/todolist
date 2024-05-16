import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { action } from "@storybook/addon-actions";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemForm } from "../AddItemForm";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem: {
      description: "Button clicked inside form",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { addItem: fn() },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// 1
export const AddItemFormStory: Story = {};

// 2
export const AddItemFormStory1 = () => (
  <AddItemForm addItem={action("addItem")} />
);

// 3
export const AddItemFormErrorStory: Story = {
  render: (args) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>("Title is required");

    console.log("AddItemForm");

    const addItem = () => {
      if (title.trim() !== "") {
        args.addItem(title);
        setTitle("");
      } else {
        setError("Title is required");
      }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error) setError(null);

      if (e.charCode === 13) {
        addItem();
      }
    };

    return (
      <div>
        <TextField
          variant="outlined"
          error={!!error}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          label="Title"
          helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
          <AddBox />
        </IconButton>
      </div>
    );
  },
};
