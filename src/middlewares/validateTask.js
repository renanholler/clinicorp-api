const Joi = require('joi');

const taskSchema = Joi.object({
  description: Joi.string().min(3).required(),
  responsable: Joi.string().required(),
  status: Joi.string().valid('done', 'doing', 'todo').required()
});

const tasksSchema = Joi.array().items(taskSchema).min(1).required();

const validateTasks = (req, res, next) => {
  const { error } = tasksSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateTasks;