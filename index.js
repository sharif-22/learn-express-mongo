import express from "express";

const server = express();
const SERVER_PORT = 2024;

server.listen(SERVER_PORT, () => {
  console.log(`Server is runnig in localhost:${SERVER_PORT}`);
});

server.get("/", (req, res) => {
  res.json({ status: 200, message: "express setup to home route (/)" });
  res.end();
});
