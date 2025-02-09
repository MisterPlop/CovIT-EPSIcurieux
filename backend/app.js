import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import router from "./routes/index.routes.js"; 

const app = express();

// Middlewares
app.use(helmet()); // Sécurité
app.use(cors()); // Gestion des CORS
app.use(morgan("dev")); // Logging
app.use(express.json({ limit: "10kb" })); // Parser JSON avec limite
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Bienvenue sur l'API",
  });
});

app.get("/api/version", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Version 1 de l'API",
  });
});

app.use("/api", router);

// Middleware de gestion globale des erreurs
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app; // ✅ Utiliser `export default` au lieu de `module.exports`
