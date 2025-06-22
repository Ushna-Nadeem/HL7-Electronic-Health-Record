const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const ehrRouter = require("./routes/ehrRoutes");

const PORT = process.env.PORT || 3000; // Port for the backend server

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ehr", ehrRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

// Connecting to the database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log(`Connected to MongoDB Database`);
  })
  .catch((error) => {
    console.log(error);
  });
