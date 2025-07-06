export const sendBadRequest = (req, res, message) => {
    res.status(400).json({
        success: false,
        message
    })
}