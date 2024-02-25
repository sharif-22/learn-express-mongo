import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv"; // for using env variables
dotenv.config();

const server = express();
const SERVER_PORT = 2024;

server.listen(SERVER_PORT, () => {
  console.log(`Server is runnig in localhost:${SERVER_PORT}`);
});

// checking the server is connected to DB then we perform our logics
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL)
  .then(() => {
    console.log("sucessfully Connected to MongoDB");

    // GET REQ
    server.get("/", (req, res) => {
      res.json({ status: 200, message: "express setup to home route (/)" });
      res.end();
    });

    // POST
    // PUT
    // DELETE
    // etc....
  })
  .catch(() => {
    console.log("Failed Connect MongoDB");
  });
