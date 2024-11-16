import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import MagicItemController from "../controllers/magic_item.controller";
import { magicItemValidationRules } from "../validators/magicItemValidator";
import { validateRequest } from "../middlewares/validationMiddleware";

class MagicItemRoutes {
  router = Router();
  magicItemController: MagicItemController;

  constructor() {
    // Retrieve the controller instance from tsyringe
    this.magicItemController = container.resolve(MagicItemController);
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/",magicItemValidationRules, validateRequest, (req:Request, res:Response) => this.magicItemController.create(req, res));
    this.router.get("/", (req, res) => this.magicItemController.getAll(req, res));
  }
}

export default new MagicItemRoutes().router;
