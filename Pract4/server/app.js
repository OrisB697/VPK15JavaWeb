const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { User, Todo } = require('./models');
const sequelize = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

console.log(swaggerSpec);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database synchronization
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
  
  // Create a test user
  User.create({
    username: 'testuser',
    password: 'testpassword'
  }).then(user => {
    console.log('Test user created');
  });
});

module.exports = app;