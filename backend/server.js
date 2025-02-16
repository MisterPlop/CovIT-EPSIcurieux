import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js"; // On importe l’index des routes
import sequelize from "./config/database.js";
import swaggerConfig from "./config/swaggerConfig.js";

dotenv.config();
const app = express();
app.use(express.json());

// Routes unifiées sous "/api"
app.use("/api", routes);

// Intégrer Swagger
swaggerConfig(app);

// Synchroniser la BDD et démarrer le serveur
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.sync(); // Synchronisation des modèles
    app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
  } catch (error) {
    console.error("❌ Erreur de connexion à la base :", error);
  }
})();
