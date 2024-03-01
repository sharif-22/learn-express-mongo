import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv"; // for using env variables
dotenv.config();

const server = express();
const SERVER_PORT = 2024;

// GET REQ
server.get("/", (req, res) => {
  res.json({ status: 200, message: "express setup to home route (/)" });
  res.end();
});

// POST
// PUT
// DELETE
// etc....

// checking the server is connected to DB then we perform our logics
// or else listen the port after DB connected
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL)
  .then(() => {
    console.log("sucessfully Connected to MongoDB");
    server.listen(SERVER_PORT, () => {
      console.log(`Server is running in localhost:${SERVER_PORT}`);
    });
  })
  .catch(() => {
    console.log("Failed Connect MongoDB");
  });
