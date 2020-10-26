import { Router, Request, Response, NextFunction } from "express";
import { findOrganization } from "../models/repositories";

const router = Router();

router.get("/:organization", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organization = await findOrganization(req.params.organization);
    res.json(organization);
  }
  catch (error) {
    next(error);
  }
});

export default router;