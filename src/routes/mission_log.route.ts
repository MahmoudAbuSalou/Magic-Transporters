import { Router } from "express";
import { container } from "tsyringe";
import MissionLogController from "../controllers/mission_log.controller";

class MissionLogRoutes {
  router = Router();
  missionController = container.resolve(MissionLogController);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", (req, res) => this.missionController.getAll(req, res));
  }
}

export default new MissionLogRoutes().router;
