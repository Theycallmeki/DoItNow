const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // 👈 for form-data & x-www-form-urlencoded

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/mevn_todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("✅ MongoDB connected"));

// Routes
app.use("/api/tasks", apiRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
