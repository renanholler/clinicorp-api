const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

// Rotas
app.use('/', taskRoutes);

module.exports = app;