
import { unathorizedResponse } from "../utils/4xx/unauthorizedResponse.js";
import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1]

    if (!token) {
        return unathorizedResponse(req, res, 'Access denied. Please log in.')
    }

    // decode the token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.userInfo = decodedToken
        console.log(decodedToken)
        next()
    } catch(error) {
        return unathorizedResponse(req, res, 'Access denied. Please log in. ')
    }
}