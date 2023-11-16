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

export async function getTasks() {
  const [rows] = await pool.query("SELECT * FROM tasks");
  return rows;
}

export async function getTask(id: number) {
  // Prepared Sequence, Prevents Attacks
  const [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [id]);
  return rows[0];
}

export async function createTask(title: string, content: string) {
  const [ResultSetHeader] = await pool.query(
    `INSERT INTO tasks (title, content) VALUES (?, ?)`,
    [title, content]
  );
  const id = ResultSetHeader["insertId"];
  return getTask(id);
}
