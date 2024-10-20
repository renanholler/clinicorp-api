const firestore = require('../utils/firestore');
const os = require('os');

const tasksCollection = firestore.collection('tasks');

async function create(tasks) {
  const computerName = os.hostname();
  const insertedTasks = [];
  
  for (const task of tasks) {
    const taskWithComputer = { ...task, computer: computerName };
    const docRef = await tasksCollection.add(taskWithComputer);
    insertedTasks.push({ id: docRef.id, ...taskWithComputer });
  }
  
  return insertedTasks;
}

async function list() {
  const snapshot = await tasksCollection.get();
  const tasks = [];
  snapshot.forEach(doc => {
    tasks.push({ ...doc.data() });
  });
  return tasks;
}

module.exports = { create, list };
