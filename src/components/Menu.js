import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router'

class Menu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">TODOs List</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem>
            <Link to="/add-category">Add Category</Link>
          </NavItem>
          <NavItem>
            <Link to="/add-todo">Add Todo</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;

Menu.contextTypes = {
  router: React.PropTypes.object.isRequired
};