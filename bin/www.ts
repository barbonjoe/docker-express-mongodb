#!/usr/bin/env node

/**
 * Module dependencies.
 */
import dotenv from "dotenv";
import http from "http";

import app from "../app";
import { normalizePort } from "../lib/utils";
import { handleError, handleListening } from "../lib/networkEvents";
import { connectAsync } from "../lib/db";

dotenv.config();

const dbUrl = process.env.URL;
if (!dbUrl) {
  throw new Error("No database connection string defined.");
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
connectAsync(dbUrl)
  .then(() => {
    server.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log("App started.");
    });
    server.on("error", handleError(port));
    server.on("listening", handleListening(server));
  })
  .catch(e => {
    // tslint:disable-next-line:no-console
    console.error(e);
  });
