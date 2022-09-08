import React, { Component, createContext } from "react";

export const TodoContext = createContext();

class TodoContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, name: "do something 1" },
        { id: 2, name: "do something 2" },
        { id: 3, name: "do something 3" },
      ],
    };
  }

  createTodo(event, todo) {
    event.preventDefault();
    let data = [...this.state.todos];
    data.push(todo);
    this.setState({
      todos: data,
    });
  }

  readTodo() {}

  updateTodo(data) {
    let todos = [...this.state.todos];
    let todo = todos.find((td) => {
      return td.id === data.id;
    });

    todo.name = data.name;

    this.setState({
      todos: todos,
    });
  }

  deleteTodo(data) {
    let todos = [...this.state.todos];
    let todo = todos.find((todo) => {
      return todo.id === data.id;
    });

    todos.splice(todos.indexOf(todo), 1);

    this.setState({ todos: todos });
  }

  render() {
    return (
      <TodoContext.Provider
        value={{
          ...this.state,
          createTodo: this.createTodo.bind(this),
          updateTodo: this.updateTodo.bind(this),
          deleteTodo: this.deleteTodo.bind(this),
        }}
      >
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}

export default TodoContextProvider;
