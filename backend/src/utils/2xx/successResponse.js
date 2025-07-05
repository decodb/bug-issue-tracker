export const greatRequest = (req, res, message, user) => {
    res.status(200).json({
        success: true,
        message,
        user 
    })
}