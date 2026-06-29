/**
 * localStorage-based todo storage keyed by RVCE ID
 * Each user's tasks are stored under: todo_<RVCE_ID>
 */

const getKey = (rvceId) => `todo_${rvceId}`;

export const getTodos = (rvceId) => {
  try {
    const data = localStorage.getItem(getKey(rvceId));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (rvceId, todos) => {
  localStorage.setItem(getKey(rvceId), JSON.stringify(todos));
};

export const addTodo = (rvceId, todo) => {
  const todos = getTodos(rvceId);
  const newTodo = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    title: todo.title,
    description: todo.description || "",
    priority: todo.priority || "Medium",
    dueDate: todo.dueDate || "",
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  todos.unshift(newTodo);
  saveTodos(rvceId, todos);
  return newTodo;
};

export const updateTodo = (rvceId, id, updates) => {
  const todos = getTodos(rvceId);
  const idx = todos.findIndex((t) => t.id === id);
  if (idx !== -1) {
    todos[idx] = { ...todos[idx], ...updates };
    saveTodos(rvceId, todos);
    return todos[idx];
  }
  return null;
};

export const deleteTodo = (rvceId, id) => {
  const todos = getTodos(rvceId).filter((t) => t.id !== id);
  saveTodos(rvceId, todos);
  return todos;
};

export const toggleTodoStatus = (rvceId, id) => {
  const todos = getTodos(rvceId);
  const idx = todos.findIndex((t) => t.id === id);
  if (idx !== -1) {
    todos[idx].status =
      todos[idx].status === "Completed" ? "Pending" : "Completed";
    todos[idx].completedAt =
      todos[idx].status === "Completed" ? new Date().toISOString() : null;
    saveTodos(rvceId, todos);
    return todos[idx];
  }
  return null;
};
