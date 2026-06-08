const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string
mongoose.connect(
  "mongodb+srv://Gayu:Gayu2006%40@cluster0.fzzinc.mongodb.net/?appName=Cluster0")
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log("MongoDB Error:");
  console.log(err);
});

const taskSchema = new mongoose.Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", taskSchema);

// Create Task
app.post("/tasks", async (req, res) => {
    const task = new Task({
        title: req.body.title
    });

    await task.save();
    res.json(task);
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Update Task
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(task);
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
        message: "Task Deleted"
    });
});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});