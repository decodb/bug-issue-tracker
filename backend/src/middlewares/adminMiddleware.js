export const isAdmin = (req, res, next) => {
    if (req.userInfo.role !== 'manager') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin rights reserved. '
        })
    }

    next()
}