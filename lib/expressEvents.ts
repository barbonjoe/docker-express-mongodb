import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

export const notFoundhandler = (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  next(createError(404));
};

export const errorhandler = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
};
