import { getUser, insertUser } from "../models/usersModel.js";
import { badRequest } from "../utils/badRequest.js";
import { conflictRequest } from "../utils/conflict.js";
import bcrypt from "bcrypt"
import { goodRequest } from "../utils/goodRequest.js";

export const registerUser = async (req, res, next) => {

    // extract information from the req.body
    const { name, surname, email, password, role, manager_id } = req.body;

    try {
        // check if the user with the email already exists
        const existingUser = await getUser(email);

        if (existingUser) return conflictRequest(req, res);

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(password, salt)

        // insert the user in our database
        const newlyRegisteredUser = await insertUser(name, surname, email, hashedPassowrd, role, manager_id)

        if (!newlyRegisteredUser) {
            badRequest('Unable to register the user. Please try again.')
        }

        goodRequest(req, res, newlyRegisteredUser)

    } catch (err) {
        next(err)
    }

}