import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import pool from './config/db.js';

dotenv.config()

const app = express()
//middlewares
app.use(express.json())
app.use(cors())

// Test the db connection
async function testDatabaseConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('PostgreSQL connected successfully at:', result.rows[0].now);
    } catch (error) {
        console.error('PostgreSQL connection failed:', error.message);
    }
}

testDatabaseConnection()

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})