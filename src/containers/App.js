import React, { Component } from 'react';

import Menu from './../components/Menu';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-page">
        <Menu />
        <div className="container bs-docs-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;