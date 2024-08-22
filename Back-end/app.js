const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./Router/authRoutes");

const NoteRoutes = require("./Router/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from http://localhost:3000-(Front-end)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies)
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/note", NoteRoutes);

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
