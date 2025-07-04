import express from "express"
import { registerUser, userLogin } from "../controllers/authController.js"

const router = express.Router()

router.post("/auth/register/", registerUser)
router.post("/auth/login/", userLogin)

export default router