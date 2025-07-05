export const conflictRequest = (req, res, message) => {
    return res.status(409).json({
        status: 409,
        message,
     })
}