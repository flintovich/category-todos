import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Col, Button } from 'react-bootstrap';

import { addCategory } from '../actions';

@connect(null, { addCategory })
class AddCategory extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);

    this.state = {
      categoryName: ''
    };
  }

  handleChangeName(e) {
    this.setState({
      categoryName: e.target.value
    });
  }

  addNewCategory() {
    const categoryId = Date.now();
    const { categoryName } = this.state;

    this.props.addCategory(categoryId.toString(), categoryName);
    this.context.router.push('/');
  }

  render() {
    return (
      <div className="add-category-container">
        <FormGroup>
          <FormControl
            type="text"
            onChange={this.handleChangeName}
            value={this.state.categoryName}
            placeholder="Enter Category name"
          />
        </FormGroup>
        <FormGroup>
          <Button bsStyle="success" onClick={this.addNewCategory}>Add Category</Button>
        </FormGroup>
      </div>
    );
  }
}

export default AddCategory;