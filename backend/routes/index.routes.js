import express from "express";
import userRoutes from "./userRoutes.js";  // routes utilisateurs
import covidRoutes from "./covidRoutes.js"; // routes COVID-19

const router = express.Router();

// Regroupe toutes les routes sous "/api"
router.use("/users", userRoutes);
router.use("/covid19", covidRoutes);

// Gère les routes non trouvées
router.all("*", (req, res) => {
  res.status(404).json({ msg: "Route non trouvée" });
});

export default router;
