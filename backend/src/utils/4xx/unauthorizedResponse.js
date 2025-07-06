export const sendUnathorizedResponse = (req, res, message) => {
    res.status(401).json({
        success: false,
        message
    })
}