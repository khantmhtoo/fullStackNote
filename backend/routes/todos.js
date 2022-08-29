const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Getting all
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:id", getTodo, async (req, res) => {
  res.send(res.todo);
});

// Creating one
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    bodyContext: req.body.bodyContext,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/:id", getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }
  if (req.body.bodyContext != null) {
    res.todo.bodyContext = req.body.bodyContext;
  }
  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete("/:id", getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: "Deleted Todo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creatinga middleware
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo === null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.todo = todo;
  next();
}

module.exports = router;
