// routes/taskRoutes.js
const express = require('express');
const taskController = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask');

const router = express.Router();

router.post('/insert-tasks', validateTask, taskController.create);
router.get('/get-tasks', taskController.list);

module.exports = router;