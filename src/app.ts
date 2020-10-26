import express, { Request, Response, NextFunction } from "express";
import organizationRouter from "./routes/organization";
import repositoriesRouter from "./routes/repositories";
import creatHttpError from "http-errors";
import cors from "cors";

const app = express();

app.use(cors());
app.use("/organization", organizationRouter);
app.use("/repositories", repositoriesRouter);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(new creatHttpError.NotFound(req.path))
);

export default app;