import { Router } from "express";
import userRoute from "./userRoutes.js";


const router = Router();


router.use("/api/v1/products", userRoute);



router.get("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});

export default router;