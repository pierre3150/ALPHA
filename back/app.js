import express from 'express';
import 'dotenv/config';
import cors from "cors";
import path from "node:path";

import mainRouter from "./router/main.router.js";
import authRouter from './router/auth.router.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(authRouter);
app.use(mainRouter);


const PORT = process.env.PORT;
const DB = process.env.DB;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${3000}`);
});
