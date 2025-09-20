const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add new task
router.post("/", async (req, res) => {
  console.log("📩 Incoming body:", req.body); // log request body
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error("❌ Error saving task:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update task
router.put("/:id", async (req, res) => {
  console.log("✏️ Update request body:", req.body); // log update body
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error("❌ Error updating task:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("❌ Error deleting task:", err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
