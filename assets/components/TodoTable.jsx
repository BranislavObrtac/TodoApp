import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function TodoTable() {
  const context = useContext(TodoContext);

  return (
    <div>
      {context.todos.map((todo) => (
        <div key={todo.name}>{todo.name}</div>
      ))}
    </div>
  );
}

export default TodoTable;
