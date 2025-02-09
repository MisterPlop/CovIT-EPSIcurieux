import express from "express";
import { getCovidData, getCovidStats } from "../controllers/covidController.js";

const router = express.Router();

router.get("/", getCovidData);
router.get("/stats", getCovidStats);

export default router;
