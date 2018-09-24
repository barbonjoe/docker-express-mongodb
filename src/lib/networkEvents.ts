import { Server } from "http";
import debug from "debug";

const serverDebug = debug("express:server");

/**
 * Event listener for HTTP server "error" event.
 */
export const handleError = (port: string | number | false) => (
  error: NodeJS.ErrnoException
) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      // tslint:disable-next-line:no-console
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      // tslint:disable-next-line:no-console
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
export const handleListening = (server: Server) => () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  serverDebug("Listening on " + bind);
};
