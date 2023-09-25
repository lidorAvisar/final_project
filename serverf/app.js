const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const {routesInit} = require("./routes/configRoutes");
const {config} = require("./config/secret")
require("./db/mongoConnect")

const app = express();

app.use(cors());

app.use(express.json({limit:"5mb"}));



app.use(express.static(path.join(__dirname,"public")));

routesInit(app)

const server = http.createServer(app);

let port = config.PORT || 3006
server.listen(port);
