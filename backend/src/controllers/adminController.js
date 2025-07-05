import { deleteEmployeeById, getAllEmployees, getEmployeeById } from "../models/adminModel.js";
import { getUser, insertUser } from "../models/usersModel.js";
import { badRequest } from "../utils/4xx/errorResponse.js";
import { conflictRequest } from "../utils/4xx/conflictResponse.js";
import { greatRequest } from "../utils/2xx/successResponse.js";
import { notFound } from "../utils/4xx/notFound.js";

export const getOverview = async(req, res) => {
    res.status(200).json({
        message: 'Welcome to home page. ',
    })
}

export const getEmployees = async (req, res, next) => {
    const { userId, name, surname, email, role } = req.userInfo;

    try {
        const employees = await getAllEmployees(userId)

        if (!employees) return notFound(req, res, "You don't have employees. Add employees.");

        greatRequest(req, res, "Employees successfully found. ", employees)
    } catch (error) {
        next(error)
    }
}

export const getEmployee = async (req, res, next) => {
    const employeeId = req.params.id;

    try {
        const employee = await getEmployeeById(employeeId);

        if (!employee) notFound(req, res, `An employee with an ID ${employeeId} wasn't found. `);

        greatRequest(req, res, "An employee successfully found. ", employee)
    } catch (error) {
        next(error)
    }
}

export const deleteEmployee = async (req, res, next) => {
    const employeeId = req.params.id;

    try {
        const employee = await deleteEmployeeById(employeeId);

        if (!employee) notFound(req, res, `An employee with an ID ${employeeId} wasn't found or deleted. `);

        greatRequest(req, res, "An employee successfully deleted. ", employee)
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

        if (employee) return conflictRequest(req, res, "You have already added this employee. ");

        const newEmployee = await insertUser(name, surname, email, password, "employee", userId);
        if (!newEmployee) return badRequest(req, res, "Failure adding a new employee. Please try again. ");

        greatRequest(req, res, newEmployee);

        if (!newEmployee) return 
    } catch (error) {
        next(error)
    }
}