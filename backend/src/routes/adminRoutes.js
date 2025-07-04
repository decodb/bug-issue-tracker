import express from "express"
import { deleteEmployee, getEmployee, getEmployees, getOverview } from "../controllers/adminController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { isAdmin } from "../middlewares/adminMiddleware.js"

const router = express.Router()

router.get("/overview", authMiddleware, isAdmin, getOverview);
router.get("/getEmployees", authMiddleware, isAdmin, getEmployees);
router.get("/getEmployee/:id", authMiddleware, isAdmin, getEmployee);
router.delete("/deleteEmployee/:id", authMiddleware, isAdmin, deleteEmployee)
export default router