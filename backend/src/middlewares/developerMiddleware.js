export const isDeveloper = (req, res, next) => {
    if (req.userInfo.role !== 'employee') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Software Developer rights reserved. '
        })
    }

    next()
}