import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import app from "./app";

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message || "Something went wrong!",
    });
});

app.listen(process.env.PORT || 3000);
