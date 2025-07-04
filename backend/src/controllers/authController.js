import { getUser, insertUser } from "../models/usersModel.js";
import { badRequest } from "../utils/badRequest.js";
import { conflictRequest } from "../utils/conflict.js";
import bcrypt from "bcrypt"
import { goodRequest } from "../utils/goodRequest.js";
import { notFound } from "../utils/notFound.js";
import { unathorizedResponse } from "../utils/unauthorizedRequest.js";
import jwt from "jsonwebtoken"
import { json } from "express";

// Register User
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

        goodRequest(req, res, 'User successfully created. ', newlyRegisteredUser)

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

        if (!user) return notFound(req, res, 'User with this email does not exist. ');

        // check if the passwords match
        const passwordsMatch = await bcrypt.compare(password, user.password_hash)

        if (!passwordsMatch) return unathorizedResponse(req, res, 'Invalid credentials. ');

        // create a token
        const accessToken = jwt.sign({
            userId: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            managerId: user.manager_id
        }, process.env.JWT_SECRET_TOKEN,{
            expiresIn: '15m'
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