import { getUser, insertUser } from "../models/usersModel.js";
import { sendBadRequest } from "../utils/4xx/errorResponse.js";
import { sendConflictResponse } from "../utils/4xx/conflictResponse.js";
import bcrypt from "bcrypt"
import { sendGoodRequest } from "../utils/2xx/createdResponse.js";
import { sendNotFound } from "../utils/4xx/notFound.js";
import { sendUnathorizedResponse } from "../utils/4xx/unauthorizedResponse.js";
import jwt from "jsonwebtoken"

// Register User
export const registerUser = async (req, res, next) => {

    // extract information from the req.body
    const { name, surname, email, password, role, manager_id } = req.body;

    try {
        // check if the user with the email already exists
        const existingUser = await getUser(email);

        if (existingUser) return sendConflictResponse(req, res, 'This email already exists. Try logging in.');

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(password, salt)

        // insert the user in our database
        const newlyRegisteredUser = await insertUser(name, surname, email, hashedPassowrd, role, manager_id)

        if (!newlyRegisteredUser) {
            sendBadRequest('Unable to register the user. Please try again.')
        }

        sendGoodRequest(req, res, "You've successfully signed up. ", newlyRegisteredUser)

    } catch (err) {
        next(err)
    }
}

// Login
export const userLogin = async (req, res, next) => {
    
    // // extract information from the req.body
    const { email, password } = req.body;

    try {
        // check if user with the entered email does exist
        const user = await getUser(email);

        if (!user) return sendNotFound(req, res, 'User with this email does not exist. ');

        // check if the passwords match
        const passwordsMatch = await bcrypt.compare(password, user.password_hash)

        if (!passwordsMatch) return sendUnathorizedResponse(req, res, 'Invalid credentials. ');

        // create a token
        const accessToken = jwt.sign({
            userId: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            managerId: user.manager_id
        }, process.env.JWT_SECRET_TOKEN,{
            expiresIn: '1hr'
        })

        res.status(201).json({
            success: true,
            message: 'User Successfuly logged in. ',
            accessToken
        })



    } catch (error) {
        next(error)
    }
}