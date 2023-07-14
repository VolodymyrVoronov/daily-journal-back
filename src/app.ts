import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

import errorHandler from "./middlewares/error-handler";
import notFound from "./middlewares/not-found";

import api from "./api";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", api);

app.use(notFound);
app.use(errorHandler);

export default app;
