export const badRequest = (req, res, message) => {
    res.status(400).json({
        success: false,
        message
    })
}