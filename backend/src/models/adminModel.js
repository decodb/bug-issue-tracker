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

// Projects models
export const addProject = async(name, description, managerId) => {
    const result = await pool.query(
        `
            INSERT INTO projects(name, description, user_id)
            VALUES($1, $2, $3) RETURNING *
        `, [name, description, managerId]
    )

    return result.rows[0]
}

export const getAllProjects = async (managerId) => {
    const result = await pool.query(
        `
            SELECT * FROM projects
            WHERE user_id=$1
        `, [managerId]
    )

    return result.rows;
}

export const getProjectById = async(id) => {
    const result = await pool.query(
        `
            SELECT * FROM projects
            WHERE id=$1
        `, [id]
    )

    return result.rows[0]
}

export const updateProjectById = async(id, name, description) => {
    const result = await pool.query(
        `
            UPDATE projects
            SET name=$1, description=$2
            WHERE id=$3 RETURNING *
        `,[name, description, id]
    )

    return result.rows[0]
}

export const deleteProjectById = async(id) => {
    const result = await pool.query(
        `
            DELETE FROM projects
            WHERE id=$1 RETURNING *
        `, [id]
    )

    return result.rows[0]
}

export const addEmployeeByIdToProject = async(pId, eId) =>{
    const result = await pool.query(
        `
            INSERT INTO project_employee(user_id, project_id)
            VALUES($1, $2) RETURNING *        
        `,[eId, pId]
    )

    return result.rows[0]
}

export const getEmployeeByForProjectById = async(pId, eId) => {
    const result = await pool.query(
        `
            SELECT * FROM project_employee
            WHERE user_id=$1 AND project_id=$2
        `,[eId, pId]
    )

    return result.rows
}