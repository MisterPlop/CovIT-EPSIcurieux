import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: console.log, // ✅ Active les logs SQL
  }
);

// 🔥 Tester la connexion et voir la base sélectionnée
(async () => {
  try {
    await sequelize.authenticate();
    const [result] = await sequelize.query("SELECT current_database();");
    console.log("🛠 Base utilisée par Sequelize :", result);
  } catch (error) {
    console.error("❌ Erreur de connexion à PostgreSQL :", error);
  }
})();

export default sequelize;
