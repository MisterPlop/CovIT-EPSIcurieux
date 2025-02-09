import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import router from "./routes/index.routes.js";
import covidRoutes from "./routes/covidRoutes.js";

const app = express();

// ✅ Middlewares (à déclarer AVANT les routes)
app.use(helmet()); 
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Routes API
app.use("/api/covid19", covidRoutes);
app.use("/api", router);

// ✅ Route par défaut
app.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenue sur l'API Covid19" });
});

app.get("/api/version", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Version 1 de l'API",
  });
});

// ✅ Vérifier les routes enregistrées après l’ajout des routes
setTimeout(() => {
  console.log("📌 Routes enregistrées :");
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`🚀 ${r.route.path}`);
    }
  });
}, 100);

// ✅ Middleware de gestion des erreurs (en dernier)
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
