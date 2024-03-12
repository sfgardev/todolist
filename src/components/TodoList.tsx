import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Filter } from "../App";
import { Button } from "./Button";
import { TodoListHeader } from "./TodoListHeader";

type TodoListProps = {
  title: string;
  tasks: Task[];
  removeTask: (taskId: string) => void;
  changeFilter: (filter: Filter) => void;
  addTask: (title: string) => void;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodoList = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
}: TodoListProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  let tasksList;
  if (tasks.length === 0) {
    tasksList = <span>Empty list</span>;
  } else {
    tasksList = (
      <ul>
        {tasks.map((task) => {
          const removeTaskHandler = () => removeTask(task.id);
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.title}</span>
              <Button onClick={removeTaskHandler} title="x" />
            </li>
          );
        })}
      </ul>
    );
  }

  const addNewTaskHandler = () => {
    // if (taskTitle.length > 15) return;
    addTask(taskTitle);
    setTaskTitle("");
  };

  const onKeyDownaddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isAddTaskPosible) {
      addNewTaskHandler();
    }
  };

  const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(e.currentTarget.value);

  const changeFilterHandlerCreator = (filter: Filter) => {
    return () => changeFilter(filter);
  };

  const maxTitleLength = 15;
  const isAddTaskPosible =
    taskTitle.length && taskTitle.length <= maxTitleLength;

  return (
    <div className="todolist">
      <TodoListHeader title={title} />
      <div>
        <input
          value={taskTitle}
          onChange={setTaskTitleHandler}
          onKeyDown={onKeyDownaddNewTaskHandler}
        />
        <Button
          title="+"
          onClick={addNewTaskHandler}
          isDisabled={!isAddTaskPosible}
        />
        {!taskTitle.length && <p>Please enter text</p>}
        {taskTitle.length > maxTitleLength && <p>Task title is too long</p>}
      </div>
      {tasksList}
      <div>
        <Button title="All" onClick={changeFilterHandlerCreator("all")} />
        <Button title="Active" onClick={changeFilterHandlerCreator("active")} />
        <Button
          title="Completed"
          onClick={changeFilterHandlerCreator("completed")}
        />
      </div>
    </div>
  );
};
