export const goodRequest = (req, res, message, user) => {
    res.status(201).json({
        success: true,
        message,
        user 
    })
}