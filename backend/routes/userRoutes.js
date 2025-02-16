import express from "express";
import { getUsers, createUser, testUser } from "../controllers/userControllers.js"; 

const router = express.Router();

router.get("/", getUsers); // GET /users
router.post("/", createUser); // POST /users
router.get("/test", testUser); // Test route

export default router;
