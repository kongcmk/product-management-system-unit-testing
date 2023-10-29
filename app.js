const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
require("dotenv").config();

const productsRoutes = require('./routes/productsRoutes.js')

const DATABASE_URL = process.env.DATABASE_URL;

// Connecting to MongoDB with Mongoose
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};

// Use the function to connect to the database
connectToDatabase();

// Middleware
app.use(express.json());
 // Add () to express.json() to correctly use it
app.use(morgan("tiny"));

// API 
app.use('/products', productsRoutes);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
