export const sendOk = (req, res, message, data) => {
    res.status(200).json({
        success: true,
        message,
        data 
    })
}