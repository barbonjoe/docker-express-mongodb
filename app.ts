import path from "path";
import express from "express";
import logger from "morgan";
import compress from "compression";
import helmet from "helmet";

import { notFoundhandler, errorhandler } from "./lib/expressEvents";

import indexRouter from "./routes/index";

const app = express();

app.use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// gzip compression
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(notFoundhandler);

// error handler
app.use(errorhandler);

export default app;
