import express from "express";
import { getUsers, createUser, testUser } from "../controllers/userControllers.js"; // ✅ Vérifie que ce fichier existe

const router = express.Router();

router.get("/getusers", getUsers);
router.post("/createuser", createUser);
router.get("/test", testUser);

// router.get("*", (req, res) => {
//     res.status(404).json({ msg: "not found" });
// });

export default router;
