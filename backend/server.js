import app from "./app.js";
import dotenv from "dotenv"; 
import setupSwagger from "./config/swaggerConfig.js";
import covidRoutes from "./routes/covidRoutes.js"; 

// Configuration des variables d'environnement
dotenv.config();
const PORT = process.env.PORT || 3000;

// Gestion des erreurs non attrapées
process.on("unhandledRejection", (err) => {
  console.error("PROMESSE NON GÉRÉE 💥", err);
  server.close(() => process.exit(1));
});

// Configuration de Swagger
setupSwagger(app);

// Utilisation des routes API
app.use("/api/covid19", covidRoutes);  // ✅ Vérifie que "covidRoutes" est bien importé

// Démarrage du serveur
const server = app.listen(PORT, "0.0.0.0", () => {  
  console.log(`🚀 Serveur accessible sur http://0.0.0.0:${PORT}`);
});


