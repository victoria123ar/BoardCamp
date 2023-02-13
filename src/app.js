import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import gamesRouter from "./routes/gamesRouter.js";
import customersRouter from "./routes/customersRouter.js";
import rentalsRouter from "./routes/rentalsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
