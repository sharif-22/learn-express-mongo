import express, { query } from "express";
import mongoose from "mongoose";

import dotenv from "dotenv"; // for using env variables
dotenv.config();

import DevData from "./models/devData.model.js";
// const DevData = require("./models/devData.model.js");

const server = express();
const SERVER_PORT = 2024;

// middleware to parse json data to server
server.use(express.json());
// middleware to parse form data to server
server.use(express.urlencoded({ extended: false }));

// GET REQ
server.get("/", (req, res) => {
  res.json({ status: 200, message: "express setup to home route (/)" });
  res.end();
});

// GET ALL collections from DB
server.get("/api/devData", async (req, res) => {
  try {
    const devDetails = await DevData.find({});
    res.status(200).json(devDetails);
  } catch (error) {
    res.json({ status: 200, message: "express setup to home route (/)" });
  }
});
// GET Specific data Collection from DB
server.get("/api/devData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const devDetails = await DevData.findById(id);
    res.status(200).json(devDetails);
  } catch (error) {
    res.json({ status: 200, message: "express setup to home route (/)" });
  }
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

// UPDATE(put) Specific data Collection from DB
server.put("/api/devData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const devDetails = await DevData.findByIdAndUpdate(id, req.body);

    if (!devDetails) {
      return res
        .status(404)
        .json({ message: "developer details not found in DB" });
    }

    const updatedDevDetails = await DevData.findById(id);
    res.status(200).json(updatedDevDetails);
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});

// DELETE
server.delete("/api/devData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const devDetails = await DevData.findByIdAndDelete(id, req.body);

    if (!devDetails) {
      return res
        .status(404)
        .json({ message: "developer details not found in DB" });
    }
    res
      .status(200)
      .json({ status: 200, message: "developer details deleted from server" });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});
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
