const taskModel = require('../models/taskModel');

exports.create = async (tasks) => {
  return await taskModel.create(tasks);
};

exports.list = async () => {
  return await taskModel.list();
};