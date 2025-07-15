import pool from "../config/db.js"

export const devProjects = async(devId) => {
    const results = await pool.query(
        `
            SELECT projects.name, projects.description, projects.created_at
            FROM projects
            JOIN project_employee
            ON project_employee.project_id = projects.id
            WHERE project_employee.user_id = $1;
        `, [devId]
    )

    return results.rows;
}

export const devIssues = async(devId) => {
    const results = await pool.query(
        `
            SELECT issues.title, issues.description, issues.priority, issues.created_by
            FROM issues
            JOIN users
            ON issues.assigned_to = users.id
            WHERE users.id = $1;
        `, [devId]
    )

    return results.rows
}