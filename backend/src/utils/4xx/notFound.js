export const sendNotFound = (req, res, message) => {
    res.status(404).json({
        success: false,
        message
    })
}