import express from "express";
import { getUsers, createUser, testUser } from "../controllers/userControllers.js"; 

const router = express.Router();

router.get("/getusers", getUsers);
router.post("/creatuser", createUser);
router.get("/test", testUser);

export default router;
