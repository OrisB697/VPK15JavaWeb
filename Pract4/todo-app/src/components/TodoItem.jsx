import { useDispatch } from 'react-redux';
import { deleteTodo, completeTodo, uncompleteTodo } from '../features/todos/todosSlice';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    if (todo.completed) {
      dispatch(uncompleteTodo(todo.id));
    } else {
      dispatch(completeTodo(todo.id));
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <span className="todo-text">{todo.title}</span> 
      <button onClick={() => dispatch(deleteTodo(todo.id))} className="delete-btn">
        Удалить
      </button>
    </div>
  );
}

export default TodoItem;