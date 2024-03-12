import { useRef } from "react";
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
  const taskTitleInput = useRef<HTMLInputElement>(null);

  let tasksList;
  if (tasks.length === 0) {
    tasksList = <span>Empty list</span>;
  } else {
    tasksList = (
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.title}</span>
              <Button
                onClick={() => {
                  removeTask(task.id);
                }}
                title="x"
              />
            </li>
          );
        })}
      </ul>
    );
  }

  const addNewTask = () => {
    if (taskTitleInput.current) {
      addTask(taskTitleInput.current.value);
      taskTitleInput.current.value = "";
    }
  };

  return (
    <div className="todolist">
      <TodoListHeader title={title} />
      <div>
        <input ref={taskTitleInput} />
        <Button title="+" onClick={addNewTask} />
      </div>
      {tasksList}
      <div>
        <Button title="All" onClick={() => changeFilter("all")} />
        <Button title="Active" onClick={() => changeFilter("active")} />
        <Button title="Completed" onClick={() => changeFilter("completed")} />
      </div>
    </div>
  );
};
