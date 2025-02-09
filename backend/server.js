import app from "./app.js";
import dotenv from "dotenv"; 

// Configuration des variables d'environnement
dotenv.config();
const PORT = process.env.PORT || 3000;

// Gestion des erreurs non attrapées
process.on("unhandledRejection", (err) => {
  console.error("PROMESSE NON GÉRÉE 💥", err);
  server.close(() => process.exit(1));
});

// Démarrage du serveur
const server = app.listen(PORT, "0.0.0.0", () => {  // ✅ Ajout de "0.0.0.0"
  console.log(`🚀 Serveur accessible sur http://0.0.0.0:${PORT}`);
});
