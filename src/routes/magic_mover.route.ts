import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import MagicMoverController from "../controllers/magic_mover.controller";
import { createMagicMoverValidationRules, endMissionValidationRules, loadMagicMoverValidationRules, startMissionValidationRules } from "../validators/magicMoverValidationRules";
import { validateRequest } from "../middlewares/validationMiddleware";

class MagicMoverRoutes {
  router = Router();
  magicMoverController: MagicMoverController;

  constructor() {
    this.magicMoverController = container.resolve(MagicMoverController);
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/",createMagicMoverValidationRules,validateRequest, (req:Request, res:Response) => this.magicMoverController.create(req, res));
    this.router.get("/", (req, res) => this.magicMoverController.getAll(req, res));
    this.router.post("/load",loadMagicMoverValidationRules,validateRequest,  (req:Request, res:Response) => this.magicMoverController.load(req, res));
    this.router.post("/start-mission",startMissionValidationRules ,validateRequest, (req:Request, res:Response) => this.magicMoverController.startMission(req, res));
    this.router.post("/end-mission", endMissionValidationRules,validateRequest, (req:Request, res:Response) => this.magicMoverController.endMission(req, res));
    this.router.get("/most-completed", (req, res) => this.magicMoverController.getMostCompleted(req, res));
  }
}

export default new MagicMoverRoutes().router;
