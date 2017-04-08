export const addTodo = (id, text, category) => (
  {
    type: 'ADD_TODO',
    id,
    text,
    category,
  }
);

export const toggleTodo = (id, categoryId) => (
  {
    type: 'TOGGLE_TODO',
    id,
    categoryId,
  }
);


export const addCategory = (id, title) => (
  {
    type: 'ADD_CATEGORY',
    id,
    title,
  }
);

export const removeCategory = id => (
  {
    type: 'REMOVE_CATEGORY',
    id,
  }
);
