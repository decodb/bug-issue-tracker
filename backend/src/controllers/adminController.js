import { deleteEmployeeById, getAllEmployees, getEmployeeById } from "../models/adminModel.js";
import { greatRequest } from "../utils/greatRequest.js";
import { notFound } from "../utils/notFound.js";

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