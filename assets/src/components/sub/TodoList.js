import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoList: 'Todo List'
    };
  }

  componentDidMount() {
    console.log(this.state);
    window.componentHandler.upgradeAllRegistered();
  }

  componentDidUpdate() {
    console.log(this.state);
    window.componentHandler.upgradeAllRegistered();
  }

  updateTodo(event, t) {
    const todo = Object.assign({}, t, { completed: event.target.checked });
    this.props.updateTodo(todo);
  }

  render() {
    const list = this.props.todos.map((todo, index) => (
      <li className="mdl-list__item" key={index}>
        <span className="mdl-list__item-primary-content" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.content}
        </span>
        <span className="mdl-list__item-secondary-action">
          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={`list-checkbox-${index}`}>
            <input type="checkbox" onChange={(event => this.updateTodo(event, todo))} id={`list-checkbox-${index}`} className="mdl-checkbox__input" defaultChecked={todo.completed} />
          </label>
        </span>
        <span className="list-action">
          <i className="material-icons">delete</i>
        </span>
      </li>
    ));

    return (
      <ul className="todo-list-control mdl-list">{list}</ul>
    );
  }
}

export default TodoList;