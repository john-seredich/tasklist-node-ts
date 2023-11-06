import express, { Express, Request, Response } from "express";
const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("Hio");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
