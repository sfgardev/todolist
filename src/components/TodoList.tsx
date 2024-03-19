import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Filter } from "../App";
import { Button } from "./Button";
import { TodoListHeader } from "./TodoListHeader";

type TodoListProps = {
  filter: Filter;
  title: string;
  tasks: Task[];
  removeTask: (taskId: string) => void;
  changeFilter: (filter: Filter) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, newStatus: boolean) => void;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodoList = ({
  title,
  tasks,
  filter,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
}: TodoListProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [inputError, setInputError] = useState<boolean>(false);

  let tasksList;
  if (tasks.length === 0) {
    tasksList = <span>Empty list</span>;
  } else {
    tasksList = (
      <ul>
        {tasks.map((task) => {
          const removeTaskHandler = () => removeTask(task.id);
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(task.id, e.currentTarget.checked);
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeStatusHandler}
              />
              <span className={task.isDone ? "task-done" : "task"}>
                {task.title}
              </span>
              <Button onClick={removeTaskHandler} title="x" />
            </li>
          );
        })}
      </ul>
    );
  }

  const addNewTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle) {
      addTask(trimmedTitle);
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
    }
    setTaskTitle("");
  };

  const onKeyDownaddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isAddTaskPosible) {
      addNewTaskHandler();
    }
  };

  const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    inputError && setInputError(false);
    setTaskTitle(e.currentTarget.value);
  };

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
          className={inputError ? "input-error" : undefined}
          onChange={setTaskTitleHandler}
          onKeyDown={onKeyDownaddNewTaskHandler}
        />
        <Button
          title="+"
          onClick={addNewTaskHandler}
          isDisabled={!isAddTaskPosible}
        />
        {!taskTitle.length && (
          <p style={{ color: inputError ? "red" : "black" }}>
            Please enter text
          </p>
        )}
        {taskTitle.length > maxTitleLength && <p>Task title is too long</p>}
      </div>
      {tasksList}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : undefined}
          title="All"
          onClick={changeFilterHandlerCreator("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : undefined}
          title="Active"
          onClick={changeFilterHandlerCreator("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : undefined}
          title="Completed"
          onClick={changeFilterHandlerCreator("completed")}
        />
      </div>
    </div>
  );
};
