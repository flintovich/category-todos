import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute,  browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import App from './containers/App';
import AddTodo from './components/AddTodo';
import AddCategory from './components/AddCategory';
import NotesList from './pages/home/TodoList';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={NotesList}/>
    <Route path="add-todo" component={AddTodo}/>
    <Route path="add-category" component={AddCategory}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
