/**
 * Normalize a port into a number, string, or false.
 */
export const normalizePort = (val: string) => {
  const p = parseInt(val, 10);

  if (isNaN(p)) {
    // named pipe
    return val;
  }

  if (p >= 0) {
    // port number
    return p;
  }

  return false;
};
