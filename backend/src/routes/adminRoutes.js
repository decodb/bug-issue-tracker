import express from "express"
import { addEmployee, addEmployeeToProject, addNewProject, createNewProjectIssue, deleteEmployee, deleteProject, getEmployee, getEmployees, getIssues, getOverview, getProject, getProjects, projectWithDevs, updateProject, updateProjectIssue } from "../controllers/adminController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { isAdmin } from "../middlewares/adminMiddleware.js"
import { getAllIssues } from "../models/adminModel.js"

const router = express.Router()

// Overview endpoints from all the tables in the database
router.get("/overview", authMiddleware, isAdmin, getOverview);

// Employees endpoints
router.get("/employees", authMiddleware, isAdmin, getEmployees);
router.get("/employee/:id", authMiddleware, isAdmin, getEmployee);
router.delete("/deleteEmployee/:id", authMiddleware, isAdmin, deleteEmployee);
router.post("/addEmployee", authMiddleware, isAdmin, addEmployee);

// Projects endpoints
router.post("/createProject", authMiddleware, isAdmin, addNewProject);
router.get("/projects", authMiddleware, isAdmin, getProjects);
router.get("/project/:id", authMiddleware, isAdmin, getProject)
router.put("/updateProject/:id", authMiddleware, isAdmin, updateProject)
router.delete("/deleteProject/:id", authMiddleware, isAdmin, deleteProject)

// not done
router.post("/project/:pId/employee/:eId", authMiddleware, isAdmin, addEmployeeToProject)
// get project along with it's developers
router.get("/project/:pId/devs", authMiddleware, isAdmin, projectWithDevs)

// Issues endpoints
router.post("/project/:pId/createIssue", authMiddleware, isAdmin, createNewProjectIssue)
router.put("/update/issue/:id/", authMiddleware, isAdmin, updateProjectIssue)
router.get("/issues", authMiddleware, isAdmin, getIssues)

//get issue by id

export default router