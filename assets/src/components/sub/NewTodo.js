import React from 'react';
import $ from 'jquery';

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todoContentEditable: 'todo-contentEditable',
      customPlaceHolder: 'customPlaceHolder'
    };
  }
  handleInput(event) {
    event.preventDefault();
    const innerHTML = event.target.innerHTML;
    if (innerHTML !== '') {
      document.getElementById(`todo-custom-placeholder-${this.props.id}`).style.display = 'none';
    } else {
      document.getElementById(`todo-custom-placeholder-${this.props.id}`).style.display = 'block';
    }
    this.setState({
      newTodo: innerHTML
    });
  }
  submitTodo() {
    if (this.state.newTodo !== '') {
      this.props.addTodo(this.state.newTodo);
    }
    document.getElementById('todo-contentEditable').innerHTML = '';
    document.getElementById(`todo-custom-placeholder-${this.props.id}`).style.display = 'block';
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submitTodo();
    }
  }
  render() {
    return (
      <div id={this.props.id} className={this.state.todoContentEditable}>
        <span id={`todo-custom-placeholder-${this.props.id}`} className={this.state.customPlaceHolder}>Add new todo</span>
        <div id="todo-contentEditable" onKeyPress={(event => this.handleKeyPress(event))} contentEditable="true" suppressContentEditableWarning={true} onInput={(event) => { this.handleInput(event); }}>
        </div>
      </div>
    );
  }
}

export default NewTodo;