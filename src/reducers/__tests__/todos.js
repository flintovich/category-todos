import { expect } from 'chai';

import todos from '../todos';

const storeEx = [
  {
    categoryId: '1491466752417',
    categoryName: 'Some cat name',
    todos: [
      {
        id: '1491466752427',
        text: 'first todo',
        isDone: 'false',
        category: '1491466752417'
      }
    ]
  }
];

describe('todos', () => {

  it('should return initial state', () => {
    const state = todos(undefined, {});

    expect(state).to.be.empty;
  });

  it('should add todo', () => {
    const state = todos(storeEx, {
      type: 'ADD_TODO',
      id: '123',
      text: 'Some todo test',
      category: '1491466752417',
    });
    const firstCategoryTodos = state[0].todos;

    expect(state).to.have.lengthOf(1);
    expect(firstCategoryTodos).to.have.lengthOf(2);
    expect(firstCategoryTodos).to.eql([
      {
        id: '123',
        text: 'Some todo test',
        category: '1491466752417',
        isDone: false
      },
      {
        id: '1491466752427',
        text: 'first todo',
        isDone: 'false',
        category: '1491466752417'
      }
    ]);
  });

});