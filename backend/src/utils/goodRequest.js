export const goodRequest = (req, res, user) => {
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user 
    })
}