require("dotenv").config();
import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
const openApiConfigration = require("./docs/swagger");
// const dbConnectNoSql = require("./config/mongo");
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;
// const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

// prueba en actions

const port = process.env.PORT || 3000;

app.use( '/documentation', swaggerUi.serve, swaggerUi.setup(openApiConfigration) );

app.listen(port, () => {
  console.log("🚀 ~ app.listen ~ port:", port)
});


app.use("/api", require("./routes"));

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySQL();

module.exports = app;