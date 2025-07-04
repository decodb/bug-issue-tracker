import pool from "../config/db.js"

export const getUser = async(email) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email=$1`, [email]
    )

    return result.rows[0]
}   

export const insertUser = async(name, surname, email, password, role = 'manager', manager_id = null) => {
    const result = await pool.query(
        `INSERT INTO users (name, surname, email, password_hash, role, manager_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `, [name, surname, email, password, role, manager_id]
    )

    return result.rows[0]
}