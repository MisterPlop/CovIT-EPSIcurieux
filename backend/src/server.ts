import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import serverRouter from "./router/serverRouter";
import cors from "cors";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CovIT API",
      description: "Documentation générée automatiquement",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  // Où Swagger doit chercher les commentaires dans l'arborescence, en JsDoc
  apis: [path.join(__dirname, "/module/**/router/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", serverRouter);

app.listen(3000, () => {
  console.log("API en écoute sur http://localhost:3000");
});
