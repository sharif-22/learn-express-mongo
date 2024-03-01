import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv"; // for using env variables
dotenv.config();

import DevData from "./models/devData.model.js";
// const DevData = require("./models/devData.model.js");

const server = express();
const SERVER_PORT = 2024;

server.use(express.json());

// GET REQ
server.get("/", (req, res) => {
  res.json({ status: 200, message: "express setup to home route (/)" });
  res.end();
});

// POST
server.post("/api/devData", async (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  try {
    const devData = await DevData.create(req.body);
    res.status(200).json(devData);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

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
