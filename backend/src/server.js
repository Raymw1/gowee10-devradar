require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { setupWebSocket } = require("./websocket");

class Server {
  constructor() {
    this.express = express();
    this.server = require("http").Server(this.express);
    setupWebSocket(this.server);
    this.middlewares();
    this.routes();
  }

  middlewares() {
    mongoose.connect(process.env.MONGO_URL);
    this.express.use(morgan("dev"));
    this.express.use(cors());
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new Server().server;
