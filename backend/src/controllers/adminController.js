import { addEmployeeByIdToProject, addProject, deleteEmployeeById, deleteProjectById, getAllEmployees, getAllProjects, getEmployeeByForProjectById, getEmployeeById, getProjectById, updateProjectById } from "../models/adminModel.js";
import { getUser, insertUser } from "../models/usersModel.js";
import { sendBadRequest } from "../utils/4xx/errorResponse.js";
import { sendConflictResponse } from "../utils/4xx/conflictResponse.js";
import { sendOk } from "../utils/2xx/successResponse.js";
import { sendNotFound } from "../utils/4xx/notFound.js";

export const getOverview = async(req, res) => {
    res.status(200).json({
        message: 'Welcome to home page. ',
    })
}

export const getEmployees = async (req, res, next) => {
    const { userId, name, surname, email, role } = req.userInfo;

    try {
        const employees = await getAllEmployees(userId)
        if (!employees) return sendNotFound(req, res, "You don't have employees. Add employees.");

        sendOk(req, res, "Employees successfully found. ", employees)
    } catch (error) {
        next(error)
    }
}

export const getEmployee = async (req, res, next) => {
    const employeeId = req.params.id;

    try {
        const employee = await getEmployeeById(employeeId);
        if (!employee) sendNotFound(req, res, `An employee with an ID ${employeeId} wasn't found. `);

        sendOk(req, res, "An employee successfully found. ", employee)
    } catch (error) {
        next(error)
    }
}

export const deleteEmployee = async (req, res, next) => {
    const employeeId = req.params.id;

    try {
        const employee = await deleteEmployeeById(employeeId);
        if (!employee) sendNotFound(req, res, `An employee with an ID ${employeeId} wasn't found or deleted. `);

        sendOk(req, res, "An employee successfully deleted. ", employee)
    } catch (error) {
        next(error)
    }
}

export const addEmployee = async (req, res, next) => {
    const { userId } = req.userInfo;
    const { name, surname, email, password } = req.body;

    try {
        // check if an employee already exists
        const employee = await getUser(email);
        if (employee) return sendConflictResponse(req, res, "You have already added this employee. ");

        const newEmployee = await insertUser(name, surname, email, password, "employee", userId);
        if (!newEmployee) return sendBadRequest(req, res, "Failure adding a new employee. Please try again. ");

        sendOk(req, res, newEmployee);

        if (!newEmployee) return 
    } catch (error) {
        next(error)
    }
}

export const addNewProject = async(req, res, next) => {
    const { userId } = req.userInfo;
    const { name, description } = req.body;

    try {
        const newProject = await addProject(name, description, userId)
        if (!newProject) return sendBadRequest(req, res, "Failure adding a new project. Try again");

        sendOk(req, res, "Project added successfully. ", newProject);
    } catch (error) {
        next(error)
    }
}

export const getProjects = async(req, res) => {
    const { userId } = req.userInfo;

    try {
        const projects = await getAllProjects(userId);
        if (!projects) return sendNotFound(req, res, "You don't have any projects. ");

        sendOk(req, res, "Projects successfully found. ", projects);
    } catch (error) {
        next(error)
    }
}

export const getProject = async(req, res, next) => {
    const id = req.params.id;

    try {
        const project = await getProjectById(Number(id))
        if (!project) return sendNotFound(req, res, "No project found. ");

        sendOk(req, res, "A project successfully found. ", project)
    } catch(error) {
        next(error)
    }
}

export const updateProject = async(req, res, next) => {
    const id = req.params.id;
    const { name, description } = req.body;

    try {
        const updatedProject = await updateProjectById(Number(id), name, description);
        if (!updatedProject) return sendBadRequest(req, res, "Failure updating the project. Please try again. ");

        sendOk(req, res, "Project successfully updated. ", updatedProject)

    } catch(error) {
        next(error)
    }
}

export const deleteProject = async(req, res, next) => {
    const id = req.params.id;

    try {
        const deletedProject = await deleteProjectById(Number(id))

        if (!deletedProject) return sendBadRequest(req, res, "Failure deleting the project. Pleaase try again. ");

        sendOk(req, res, "Project successfully deleted. ", deletedProject)
    } catch(error) {
        next(error)
    }
}

export const addEmployeeToProject = async(req, res, next) => {
    const { pId, eId } = req.params;

    try {
        const emp_project = await getEmployeeByForProjectById(pId, eId);
        if((emp_project).length > 0) return sendBadRequest(req, res, "You have already added this employee to this project. ");

        const addEmp = await addEmployeeByIdToProject(pId, eId);
        sendOk(req, res, "An employee succcessfully added to the project. ", addEmp)
    } catch (error) {
        next(error)
    }
}