import { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      console.log(res.data);
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState("");

  const handleCreateTodolist = () => {
    todolistAPI.createTodolist(title).then((res) => {
      setState(res.data);
      setTitle("");
    });
  };

  // useEffect(() => {
  //   todolistAPI.createTodolist("New todo").then((res) => {
  //     setState(res.data);
  //   });
  // }, []);

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <button onClick={handleCreateTodolist}>Create todolist</button>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");

  const handleDeleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
      setTodolistId("");
    });
  };

  // useEffect(() => {
  //   const todolistId = "bcd6586a-164e-4283-a28f-86d131c06e1d";

  //   todolistAPI.deleteTodolist(todolistId).then((res) => {
  //     setState(res.data);
  //   });
  // }, []);

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <input
        type="text"
        value={todolistId}
        onChange={(event) => setTodolistId(event.currentTarget.value)}
      />
      <button onClick={handleDeleteTodolist}>Delete todolist</button>
    </div>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");

  const handleUpdateTodolistTitle = () => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data);
    });
    setTodolistId("");
    setTitle("");
  };

  // useEffect(() => {
  //   const todolistId = "8a247898-5d3e-43c8-8017-412ad2995dbc";

  //   todolistAPI.updateTodolist(todolistId, "Updated new todo").then((res) => {
  //     setState(res.data);
  //   });
  // }, []);

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <input
          type="text"
          value={todolistId}
          placeholder="TodolistId"
          onChange={(event) => setTodolistId(event.currentTarget.value)}
        />
      </div>
      <button onClick={handleUpdateTodolistTitle}>Update</button>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");

  const handleGetTasks = () => {
    todolistAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
    setTodolistId("");
  };

  // useEffect(() => {
  //   const todolistId = "6863bf1b-7ab3-45d3-bb14-f8b67fedb725";

  //   todolistAPI.getTasks(todolistId).then((res) => {
  //     setState(res.data);
  //   });
  // }, []);

  // return <div>{JSON.stringify(state)}</div>;
  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <input
        type="text"
        value={todolistId}
        placeholder="TodolistId"
        onChange={(event) => setTodolistId(event.currentTarget.value)}
      />
      <button onClick={handleGetTasks}>Get tasks</button>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");

  const handleCreateTask = () => {
    todolistAPI.createTask(todolistId, title).then((res) => {
      setState(res.data);
    });

    setTodolistId("");
    setTitle("");
  };

  // useEffect(() => {
  //   const todolistId = "6863bf1b-7ab3-45d3-bb14-f8b67fedb725";

  //   todolistAPI.createTask(todolistId, "another task from hw").then((res) => {
  //     setState(res.data);
  //   });
  // }, []);

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <input
          type="text"
          value={todolistId}
          placeholder="TodolistId"
          onChange={(event) => setTodolistId(event.currentTarget.value)}
        />
      </div>
      <button onClick={handleCreateTask}>Create task</button>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleDeleteTask = () => {
    // const todolistId = "f499092a-dea5-4a5d-b1b2-d49a7a4d27dd";
    // const taskId = "d9e784ea-2755-43d8-acb8-e861f70b29bd";

    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
    setTodolistId("");
    setTaskId("");
  };

  // useEffect(() => {
  //   const todolistId = "6863bf1b-7ab3-45d3-bb14-f8b67fedb725";
  //   const taskId = "010ac024-4652-4e96-9554-0122ef38e235";

  //   todolistAPI.deleteTask(todolistId, taskId).then((res) => {
  //     setState(res.data);
  //   });
  // }, []);

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input
          type="text"
          value={todolistId}
          placeholder="TodolistId"
          onChange={(event) => setTodolistId(event.currentTarget.value)}
        />
        <input
          type="text"
          value={taskId}
          placeholder="TaskId"
          onChange={(event) => setTaskId(event.currentTarget.value)}
        />
      </div>
      <button onClick={handleDeleteTask}>Delete task</button>
    </div>
  );
};

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");

  // useEffect(() => {
  //   const todolistId = "6863bf1b-7ab3-45d3-bb14-f8b67fedb725";
  //   const taskId = "b06b72a0-ee0a-48d3-b113-720b8d145d78";

  //   todolistAPI
  //     .updateTask(todolistId, taskId, "Updated task from hw")
  //     .then((res) => {
  //       console.log(res.data.data.item.title);
  //       setState(res.data.data);
  //     });
  // }, []);

  const handleUpdateTaskTitle = () => {
    // todolistAPI.updateTask(todolistId, taskId, title).then((res) => {
    //   setState(res.data);
    // });
    // setTodolistId("");
    // setTaskId("");
    // setTitle("");
  };

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <input
          type="text"
          value={todolistId}
          placeholder="TodolistId"
          onChange={(event) => setTodolistId(event.currentTarget.value)}
        />
        <input
          type="text"
          value={taskId}
          placeholder="TaskId"
          onChange={(event) => setTaskId(event.currentTarget.value)}
        />
      </div>
      <button onClick={handleUpdateTaskTitle}>Update task</button>
    </div>
  );
};

// todo 6863bf1b-7ab3-45d3-bb14-f8b67fedb725
// task bae7437f-71a7-4de5-9879-bdcd5f71d5c7
