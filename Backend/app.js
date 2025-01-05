import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello world.");
});

export default app;
