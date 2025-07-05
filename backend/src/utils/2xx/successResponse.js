export const greatRequest = (req, res, message, data) => {
    res.status(200).json({
        success: true,
        message,
        data 
    })
}