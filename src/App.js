import React, { useState } from "react";
import "./App.css";

class App extends React.Component {
  state = { todos: ["todo 1", "todo 2", "todo 3"] };

  handleDelete = (index) => {
    const newArr = [...this.state.todos];
    newArr.splice(index, 1);
    this.setState({ todos: newArr });
  };

  handleSubmit = (todo) => {
    this.setState({ todos: [...this.state.todos, todo] });

  };

  render() {
    return (
      <div className="wrapper">
        <div className="card frame">
          <Header numTodos={this.state.todos.length} />
          <TodoList todos={this.state.todos} onDelete={this.handleDelete} />
          <SubmitForm onFormSubmit={this.handleSubmit} />

        </div>
      </div>
    );
  }
}

const SubmitForm = (props) => {
  const [todoText, setTodoText] = useState("");


  function eventHandler(event) {
    event.preventDefault(); // DO NOT RELOAD PAGE
    props.onFormSubmit(todoText); // SEND TODOTEXT TO 'ONFORMSUBMIT'

  }

  return (
    <form onSubmit={eventHandler}>
      <input
        type="text"
        className="input"
        placeholder="What to do?"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button className="button">OK</button>

    </form>
  );
};

const Header = (props) => {
  return (
    <div className="card-header">
      <h1 className="card-header-title header">
        You have: {props.numTodos} Todos!
      </h1>
    </div>
  );
};

const TodoList = (props) => {
  const mytodos = props.todos.map((todo, index) => {
    return (
      <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    );
  });
  return <div className="list-wrapper">{mytodos}</div>;
};

const Todo = (props) => {
  return (
    <div className="list-item">
      {props.content}
      <button
        className="done"
        onClick={() => {
          props.onDelete(props.id);
        }}
      >x</button>
    </div>
  );
};

export default App;
