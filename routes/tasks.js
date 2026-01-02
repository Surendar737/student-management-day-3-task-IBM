const express = require("express");
const router = express.Router();

// Temporary data (no database)
let tasks = [];

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// POST new task
router.post("/", (req, res) => {
  const { title, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newTask = {
    id: Date.now(),
    title,
    status,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, status } = req.body;

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title;
  task.status = status;

  res.json(task);
});

// DELETE task
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);

  res.json({ message: "Task deleted" });
});

module.exports = router;
