import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { Panel, ListGroup, ListGroupItem, Table } from 'react-bootstrap';

import { toggleTodo, removeCategory, loadData } from '../../actions/index';
import './TodoList.css';

@connect(mapStateToProps, { toggleTodo, removeCategory, loadData })
class TodoList extends Component {

  constructor(props) {
    super(props);

    this.toggleTodoState = this.toggleTodoState.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.loadServerData = this.loadServerData.bind(this);
  }

  toggleTodoState(todoId, categoryId) {
    this.props.toggleTodo(todoId, categoryId);
  }

  removeCategory(categoryId) {
    this.props.removeCategory(categoryId);
  }

  loadServerData(text, categoryId) {
    this.props.loadData(text, categoryId);
  }

  getTodoList(category) {
    console.log(777, category);

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
            {todo.text && <button onClick={this.loadServerData.bind(this, todo.text, category.categoryId)}>Load info</button>}
            {category.cryptoData && (
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{category.cryptoData.name}</td>
                  </tr>
                  <tr>
                    <td>Symbol</td>
                    <td>{category.cryptoData.symbol}</td>
                  </tr>
                  <tr>
                    <td>Rank</td>
                    <td>{category.cryptoData.rank}</td>
                  </tr>
                  <tr>
                    <td>Prise USD</td>
                    <td>{`$${category.cryptoData.price_usd}`}</td>
                  </tr>
                  <tr>
                    <td>Capital USD</td>
                    <td>{`$${category.cryptoData.market_cap_usd}`}</td>
                  </tr>
                </tbody>
              </Table>
            )}
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
