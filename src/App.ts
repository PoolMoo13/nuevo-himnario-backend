import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import openApiConfiguration from "./docs/swagger";
import dbConnect from "./config/mongo";
import routes from "./routes"

const app = express();

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());
app.use(express.static("hymnals"));

const port = process.env.PORT || 3000;

app.use( '/documentation',
  swaggerUi.serve, 
  swaggerUi.setup(openApiConfiguration) );

app.use("/api", routes)

app.listen(port, () => {
  console.log(`Listo: http://localhost:${port}`);
});
dbConnect().then (() => {
  console.log(`Conectado a la base de datos ${ENGINE_DB} en ${NODE_ENV}`);
  
});

export default app;