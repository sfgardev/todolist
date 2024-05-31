import type { Meta, StoryObj } from "@storybook/react";

import { Provider, useSelector } from "react-redux";
import { Task } from "../Task";
import { AppRootStateType, store } from "../state/store";
import { ReduxStoreProviderDecorator } from "../state/ReduxStoreProviderDecorator";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolist-api";
// import { TaskType } from "../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsNotDone: Story = {
  args: {
    task: {
      id: "1",
      status: TaskStatuses.New,
      title: "CSS",
      todolistId: "todolistId1",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
      description: "",
    },
    todolistId: "todolist1",
  },
};

export const TaskIsDone: Story = {
  args: {
    task: {
      id: "2",
      status: TaskStatuses.Completed,
      title: "JS",
      todolistId: "todolistId2",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
      description: "",
    },
    todolistId: "todolistId2",
  },
};

const TaskWrapper = () => {
  let task = useSelector<AppRootStateType, TaskType>(
    (state) => state.tasks["todolistId1"][0]
  );

  // if (!task) task = { id: "qwe", isDone: true, title: "JS" };

  return (
    <>{task ? <Task task={task} todolistId="todolistId1" /> : "No task"}</>
  );
};

export const TaskToggleStory: Story = {
  render: () => <TaskWrapper />,
};
