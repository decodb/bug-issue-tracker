export const conflictRequest = (req, res) => {
    return res.status(409).json({
        status: 409,
        message: 'User already exists. Try logging in.'
     })
}