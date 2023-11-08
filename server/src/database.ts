import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM tasks");
  return rows;
}

async function getNote(id: number) {
  // Prepared Sequence, Prevents Attacks
  const [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [id]);
  return rows[0];
}

const note = await getNote(1);
console.log(note);
