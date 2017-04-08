import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import { toggleTodo, removeCategory } from '../../actions/index';
import './TodoList.css';

@connect(mapStateToProps, { toggleTodo, removeCategory })
class TodoList extends Component {

  constructor(props) {
    super(props);

    this.toggleTodoState = this.toggleTodoState.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }

  toggleTodoState(todoId, categoryId) {
    this.props.toggleTodo(todoId, categoryId);
  }

  removeCategory(categoryId) {
    this.props.removeCategory(categoryId);
  }

  getTodoList(category) {
    return category.todos.map(todo => {
      const isDone = todo.isDone;
      const todoClass = isDone ? 'fa-minus-square' : 'fa-plus-square';
      const time = Number(todo.id);

      return (
        <ListGroupItem key={todo.id}>
          <div className={`todo ${isDone ? 'done' : ''}`}>
            <div className="header-content">
              <div className="created-time">
                <time>Created: {moment(time).format('DD.MM.YYYY, HH:mm:ss')}</time>
              </div>
              <i className={`check-todos fa ${todoClass}`}
                 aria-hidden="true"
                 onClick={this.toggleTodoState.bind(this, todo.id, category.categoryId)}
              ></i>
            </div>
            <div>{todo.text}</div>
          </div>
        </ListGroupItem>
      )
    })
  }

  getCategoryStatus(todos) {
    const closedTodos = todos.filter(todo => todo.isDone);
    if(closedTodos.length === todos.length) {
      return 'success'
    } else if (closedTodos.length === 0) {
      return 'danger'
    }
    return 'warning';
  }

  render() {
    const { todos } = this.props;

    if(todos.length < 1) {
      return <h2>Notes list is empty</h2>
    }

    return (
      <div>
        {todos.map && todos.map(category => {
          const categoryStatus = this.getCategoryStatus(category.todos);

          return (
            <Panel collapsible
                   defaultExpanded
                   bsStyle={categoryStatus}
                   key={`${category.categoryId}_${category.categoryName}`}
                   header={category.categoryName}>

              {categoryStatus === 'success'
                && <div className="remove-todo"
                        onClick={this.removeCategory.bind(this, category.categoryId)}>Remove Category</div>}

              <ListGroup fill>
                {this.getTodoList(category)}
              </ListGroup>
            </Panel>
          )
        })}
      </div>
    );
  }
}

export default TodoList;

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}
