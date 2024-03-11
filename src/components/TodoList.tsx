import { Filter } from "../App";
import { Button } from "./Button";
import { TodoListHeader } from "./TodoListHeader";

type TodoListProps = {
  title: string;
  tasks: Task[];
  removeTask: (taskId: number) => void;
  changeFilter: (filter: Filter) => void;
};

export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export const TodoList = ({
  title,
  tasks,
  removeTask,
  changeFilter,
}: TodoListProps) => {
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

  return (
    <div className="todolist">
      <TodoListHeader title={title} />
      <div>
        <input />
        <Button title="+" />
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
