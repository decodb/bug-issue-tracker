import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { isDeveloper } from "../middlewares/developerMiddleware.js"
import { getDevIssues, getDevProjects } from "../controllers/developerController.js"

const router = express.Router()

// projects endpoints
router.get("/projects", authMiddleware, isDeveloper, getDevProjects)

// issues endpoints
router.get("/issues", authMiddleware, isDeveloper, getDevIssues)

export default router