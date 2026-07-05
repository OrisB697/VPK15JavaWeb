const { Todo } = require('../models');

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ where: { id, userId: req.user.id } });

    if (!todo) {
      return res.status(404).send({ error: 'Todo не найден' });
    }

    await todo.update(req.body);
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ where: { id, userId: req.user.id } });

    if (!todo) {
      return res.status(404).send({ error: 'Todo не найден' });
    }

    await todo.destroy();
    res.send({ message: 'Todo успешно удален' });
  } catch (error) {
    res.status(500).send(error);
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ where: { id, userId: req.user.id } });

    if (!todo) {
      return res.status(404).send({ error: 'Todo не найден' });
    }

    await todo.update({ completed: true });
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
};

const markAsNotCompleted = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
  
      if (!todo) {
        return res.status(404).send({ error: 'Todo не найден' });
      }
  
      await todo.update({ completed: false });
      res.send(todo);
    } catch (error) {
      res.status(400).send(error);
    }
  };

const getCompletedTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ 
      where: { 
        userId: req.user.id,
        completed: true 
      } 
    });
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  markAsCompleted,
  markAsNotCompleted,
  getCompletedTodos
};