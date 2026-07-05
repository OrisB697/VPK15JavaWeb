import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../features/todos/todosSlice';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

function TodoList() {
  const dispatch = useDispatch();
  const { items: todos, isLoading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (isLoading) return <div className="loading">Загрузка задач...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-container">
      <h2>Мои задачи</h2>
      <AddTodoForm />
      
      {activeTodos.length > 0 && (
        <div className="todo-section">
          <h3>Активные ({activeTodos.length})</h3>
          {activeTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
      
      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h3>Выполненные ({completedTodos.length})</h3>
          {completedTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
      
      {todos.length === 0 && (
        <p className="empty">Нет задач. Добавьте первую!</p>
      )}
    </div>
  );
}

export default TodoList;