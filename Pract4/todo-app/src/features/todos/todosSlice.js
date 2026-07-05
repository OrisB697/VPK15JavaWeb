import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Получить все задачи
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('/api/todos', getAuthHeader());
  return response.data;
});

// Добавить задачу - ИСПРАВЛЕНО под структуру сервера
export const addTodo = createAsyncThunk('todos/addTodo', async (title, { rejectWithValue }) => {
  try {
    const newTodo = {
      title: title,
      description: "",
      completed: false,
      dueDate: new Date().toISOString()
    };
    
    const response = await axios.post('/api/todos', newTodo, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Ошибка добавления:', error.response?.data);
    return rejectWithValue(error.response?.data);
  }
});

// Удалить задачу
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`/api/todos/${id}`, getAuthHeader());
  return id;
});

// Отметить как выполненное
export const completeTodo = createAsyncThunk('todos/completeTodo', async (id) => {
  await axios.patch(`/api/todos/${id}/complete`, {}, getAuthHeader());
  return id;
});

// Снять отметку о выполнении
export const uncompleteTodo = createAsyncThunk('todos/uncompleteTodo', async (id) => {
  await axios.patch(`/api/todos/${id}/not-complete`, {}, getAuthHeader());
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearTodos: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение задач
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Добавление задачи
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload?.message || 'Ошибка добавления';
      })
      // Удаление задачи
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
      // Отметка о выполнении
      .addCase(completeTodo.fulfilled, (state, action) => {
        const todo = state.items.find(t => t.id === action.payload);
        if (todo) todo.completed = true;
      })
      // Снятие отметки
      .addCase(uncompleteTodo.fulfilled, (state, action) => {
        const todo = state.items.find(t => t.id === action.payload);
        if (todo) todo.completed = false;
      });
  },
});

export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;