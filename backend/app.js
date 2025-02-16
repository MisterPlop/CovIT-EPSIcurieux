import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import router from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(helmet()); 
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use("/api", router);

// Route par défaut
app.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenue sur l'API Covid19" });
});

app.get("/api/version", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Version 1 de l'API",
  });
});

// Vérification des routes enregistrées (pour debug)
setTimeout(() => {
  console.log("📌 Routes enregistrées :");
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`🚀 ${r.route.path}`);
    }
  });
}, 100);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("❌ ERREUR :", err.message);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
