const taskService = require('../services/taskService');

exports.create = async (req, res) => {
  try {
    const tasks = req.body;
    const insertedTasks = await taskService.create(tasks);
    res.status(201).json(insertedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const tasks = await taskService.list();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};