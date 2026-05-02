import express, { Express, Request, Response } from "express";
import authRouter from "./module/auth/auth.route.js";
// import cors from "cors";
import path from "node:path";

const app: Express = express();

app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   }),
// );
app.use(express.static(path.resolve("./public")));

app.get("/health", (req: Request, res: Response) => {
  res.json({
    message: "ok",
  });
});

app.use("/api/auth", authRouter);

export default app;
