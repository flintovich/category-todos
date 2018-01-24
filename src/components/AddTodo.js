import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';

import { addTodo } from '../actions';

@connect(mapStateToProps, { addTodo })
class AddTodo extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);

    this.state = {
      todoValue: '',
      todoCategory: '',
    };
  }

  handleChangeValue(e) {
    this.setState({
      todoValue: e.target.value,
    });
  }

  handleChangeCategory(e) {
    this.setState({
      todoCategory: e.target.value,
    });
  }

  addNewTodo() {
    const { todoValue, todoCategory } = this.state;
    const todoID = Date.now();

    this.props.addTodo(todoID.toString(), todoValue, todoCategory);
    this.context.router.push('/');
  }

  getCategoryOptions() {
    return this.props.todos.map(category => {
      return (
        <option key={category.categoryId}
                value={category.categoryId}>
          {category.categoryName}
        </option>
      )
    })
  }

  render() {
    if(this.props.todos.length < 1) {
      return <h2>Please create some category first</h2>
    }

    return (
      <div className="add-todo-container">
        <FormGroup>
          <FormGroup>
            <ControlLabel>Select Category</ControlLabel>
            <FormControl componentClass="select" placeholder="select"
                         onChange={this.handleChangeCategory}>
              <option value="select">select</option>
              {this.getCategoryOptions()}
            </FormControl>
          </FormGroup>

          <FormControl
            componentClass="textarea"
            onChange={this.handleChangeValue}
            value={this.state.todoValue}
            placeholder="Enter correct crypto name. Like: bitcoin, ethereum, ripple"
          />
        </FormGroup>
        <FormGroup>
          <Button bsStyle="success" onClick={this.addNewTodo}>Add TODO</Button>
        </FormGroup>
      </div>
    );
  }
}

export default AddTodo;

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}