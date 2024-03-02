import express from "express";
import mongoose from "mongoose";
import devDataRoutes from "./routes/devData.route.js"; //devData route
import dotenv from "dotenv"; // for using env variables
dotenv.config();

const server = express();
const SERVER_PORT = 2024;

// middleware to parse json data to server
server.use(express.json());
// middleware to parse form data to server
server.use(express.urlencoded({ extended: false }));

// routes
server.use("/api/devData", devDataRoutes);

// GET REQ from / (home)
server.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "welcome to devData \n explore data in :- /api/devData",
  });
  res.end();
});

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
