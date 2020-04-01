const express = require("express");

const hobbitsRouter = require("./routes/hobbitsRouter");

const server = express();

server.use(express.json());

server.get("/api", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.use("/api/hobbits/", hobbitsRouter);
server.use("/*", (req, res) =>
  res.status(404).json({ error: "endpoint not found" })
);
server.use((error, req, res, next) => {
  return res.status(500).json({ error: error.message });
});
module.exports = server;
