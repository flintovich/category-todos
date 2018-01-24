/*
 STORE EXAMPLE HERE
[
  {
    categoryId: '1491466752417',
    categoryName: 'Some cat name',
    todos: [
      {
        id: '1491466752427',
        text: 'first todo',
        isDone: 'false',
        category: '1491466752417',
        cryptoData: {},
      }
    ]
  },
  {
    categoryId: '1491466752419',
    categoryName: 'Some cat name 2',
    todos: [
      {
        id: '1491466752427',
        text: 'second todo',
        isDone: 'false',
        category: '1491466752419'
      }
    ]
  }
]*/

const initialState = [];

const toggleTodoState = (todos, id) => {
  return todos.map(todo => {
    if(todo.id === id) {
      const toggleIsDone = {isDone: !todo.isDone};

      return Object.assign({}, todo, toggleIsDone);
    }
    return todo;
  })
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      const category = {
        categoryId: action.id,
        categoryName: action.title,
        todos: [],
      };
      return [category, ...state];
    }

    case 'ADD_TODO': {
      const newTodo = {
        id: action.id,
        text: action.text,
        category: action.category,
        isDone: false,
      };

      return state.map(category => {
        if(category.categoryId === action.category) {
          return {
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            todos: [newTodo, ...category.todos],
          }
        }

        return category;
      });
    }

    case 'TOGGLE_TODO': {
      return state.map(category => {
        if(category.categoryId === action.categoryId) {
          return {
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            todos: toggleTodoState(category.todos, action.id),
          }
        }

        return category;
      });
    }

    case 'REMOVE_CATEGORY': {
      return state.filter(category => category.categoryId !== action.id);
    }

    case 'API_CALL_SUCCESS': {
      console.log(123, action);
      const item = action.data;
      const cryptoData = {
        name: item.name,
        symbol: item.symbol,
        rank: item.rank,
        price_usd: item.price_usd,
        market_cap_usd: item.market_cap_usd,
      };

      return state.map(category => {
        if(category.categoryId === action.categoryId) {
          return {
            ...category,
            cryptoData,
          }
        }

        return category;
      });
    }

    default: {
      return state;
    }
  }
}