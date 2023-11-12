import express from "express";
import { getNote, getNotes, createNote } from "./database.js";
const port = 8080;

const app = express();
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get("/tasks/:id", async (req, res) => {
  // Add handling for empty case
  const id = req.params.id;
  const task = await getNote(Number(id));
  res.send(task);
});

app.post("/tasks", async (req, res) => {
  const { title, content } = req.body;
  const task = await createNote(title, content);
  res.status(201).send(task);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
