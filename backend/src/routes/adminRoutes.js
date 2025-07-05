import express from "express"
import { addEmployee, deleteEmployee, getEmployee, getEmployees, getOverview } from "../controllers/adminController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { isAdmin } from "../middlewares/adminMiddleware.js"

const router = express.Router()

// Overview endpoints from all the tables in the database
router.get("/overview", authMiddleware, isAdmin, getOverview);

// Employees endpoints
router.get("/employees", authMiddleware, isAdmin, getEmployees);
router.get("/employee/:id", authMiddleware, isAdmin, getEmployee);
router.delete("/deleteEmployee/:id", authMiddleware, isAdmin, deleteEmployee);
router.post("/addEmployee", authMiddleware, isAdmin, addEmployee)

// Projects endpoints
router.post("/createProject", authMiddleware, isAdmin, );
router.get("/getProjects", authMiddleware, isAdmin, );
router.get("/getProject/:id", authMiddleware, isAdmin, )
router.put("updateProject/:id", authMiddleware, isAdmin, )
router.delete("/deleteProject/:id", authMiddleware, isAdmin, )

export default router