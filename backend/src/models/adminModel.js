import pool from "../config/db.js"

export const getAllEmployees = async(managerId) => {

    const result = await pool.query(
        `
            SELECT * FROM users
            WHERE role='employee' AND manager_id=$1
        `, [managerId]
    )

    return result.rows;

}

export const getEmployeeById = async (userId) => {
    
    const result = await pool.query(
        `
            SELECT * FROM users
            WHERE id=$1 
        `, [userId]
    )

    return result.rows[0]
}

export const deleteEmployeeById = async(userId) => {

    const result = await pool.query(
        `
            DELETE FROM users
            WHERE id=$1 RETURNING *    
        `, [userId]
    )

    return result.rows[0]
}