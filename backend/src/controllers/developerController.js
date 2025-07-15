import { devIssues, devProjects } from "../models/developerModel.js";
import { sendOk } from "../utils/2xx/successResponse.js";
import { sendBadRequest } from "../utils/4xx/errorResponse.js";

export const getDevProjects = async(req, res, next) => {
    const { userId } = req.userInfo;

    try {
        const projects = await devProjects(userId)

        if(!projects) return sendBadRequest(req, res, 'You are currently not assigned any project. ');

        sendOk(req, res, 'Developers projects successfully found. ', projects)
    } catch (error) {
        next(error)
    }
}

export const getDevIssues = async(req, res, next) => {
    const { userId } = req.userInfo;

    try {
        const issues = await devIssues(userId);

        if(issues.length < 0) sendBadRequest(req, res, 'You are currently not assigned any issue.');

        sendOk(req, res, 'Developer issues successfully found. ', issues)
        
    } catch(error) {
        next(error)
    }
}