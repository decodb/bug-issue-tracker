export const unathorizedResponse = (req, res, message) => {
    res.status(401).json({
        success: false,
        message
    })
}