import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // ✅ Charge les variables d'environnement

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres", 
    port: process.env.DB_PORT,
    logging: false, // Désactiver les logs SQL (optionnel)
  }
);

// Fonction pour tester la connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès.");
  } catch (error) {
    console.error("❌ Impossible de se connecter à la base de données:", error);
    process.exit(1); // Arrête l'application en cas d'échec
  }
};

sequelize.sync({ alter: true })  // Synchronisation des tables
  .then(() => console.log("✅ Synchronisation des modèles Sequelize réussie !"))
  .catch((error) => console.error("❌ Erreur de synchronisation :", error));


// Exécute le test de connexion au démarrage
testConnection();  

export default sequelize;
