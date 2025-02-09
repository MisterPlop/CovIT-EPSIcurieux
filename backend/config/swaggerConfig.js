import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Covid19 - Documentation",
      version: "1.0.0",
      description: "Documentation de l'API Covid19 avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur local",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Documentation disponible sur http://localhost:3000/api-docs");
};
