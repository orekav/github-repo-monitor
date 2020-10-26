import { Router, Request, Response, NextFunction } from "express";
import { findRepositories, findRepository } from "../models/repositories";

const router = Router();

router.get("/:organization", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pageNumber, perPage } = req.query;
    const queryParams = { page: Number(pageNumber), per_page: Number(perPage) };
    const repositories = await findRepositories(req.params.organization, queryParams);
    res.json(repositories);
  }
  catch (error) {
    next(error);
  }
});

router.get("/:organization/:repoName", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organization, repoName } = req.params;
    const repository = await findRepository(organization, repoName);
    res.json(repository);
  }
  catch (error) {
    next(error);
  }
});

export default router;