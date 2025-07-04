import express from "express"
import { getOverview } from "../controllers/adminController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { isAdmin } from "../middlewares/adminMiddleware.js"

const router = express.Router()

router.get("/overview", authMiddleware, isAdmin, getOverview)

export default router