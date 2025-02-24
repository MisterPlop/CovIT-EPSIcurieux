import express from "express";
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // Protection par token

const router = express.Router();

// 🔹 Routes protégées par token
router.get("/getAllUser", verifyToken, getAllUsers);
router.get("/getUserById:id", verifyToken, getUserById);
router.put("/updateUser:id", verifyToken, updateUser);
router.delete("/deleteUser:id", verifyToken, deleteUser);

// 🔹 Route de création de user (ouverte)
router.post("/", createUser);

export default router;
