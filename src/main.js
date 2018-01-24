import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute,  browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store';
import rootSaga from './sagas';

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
const store = configureStore();

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
