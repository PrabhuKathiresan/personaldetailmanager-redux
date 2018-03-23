import React from 'react';
import $ from 'jquery';
import NewTodo from '../sub/NewTodo';
import TodoList from '../sub/TodoList';
import NodatafoundSVG from '../../svg/Nodatafound';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'TODO MANAGER',
      todoClass: 'todo-container',
      floatingTodo: 'floating-input'
    };
  }
  componentWillMount() {
    $('main.mdl-layout__content').scrollTop(0);
    if (!this.props.todos.initiallyLoaded) {
      this.props.onLoad(this.props.todos.limit, this.props.todos.skip);
    }
  }

  componentDidMount() {
    console.log(this);
    setTimeout(() => {
      const height = $('header.mdl-layout__header').height();
      $('#floatingElement').css({ top: `${height}px` });
    }, 100);
    $('#floatingElement').hide();
    $(() => {
      $('main.mdl-layout__content').on('scroll', (e) => {
        const elem = $(e.currentTarget);
        const scrollTop = elem[0].scrollTop;
        if (scrollTop > 35) {
          $('#floatingElement').show();
        } else {
          $('#floatingElement').hide();
        }
      });
    });
  }

  componentWillUnmount() {
    console.log(this.state);
    $('main.mdl-layout__content').unbind('scroll');
  }

  render() {
    const todoList = <TodoList todos={this.props.todos.data} updateTodo={this.props.updateTodo} />;
    const nodatafound = <div className="text-center"><NodatafoundSVG /><div className="title">No data found</div></div>;
    return (
      <div className={this.state.todoClass}>
        <div id="floatingElement" className={this.state.floatingTodo}>
          <NewTodo id="float" addTodo={this.props.addTodo} />
        </div>
        <NewTodo id="normal" addTodo={this.props.addTodo} />
        { this.props.todos.data.length > 0 ? todoList : nodatafound }
      </div>
    );
  }
}

export default Todos;