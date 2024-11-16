import { container } from "tsyringe";
import MissionLogRepo from "../repositories/mission_log.repo";
import MissionLogService from "../services/mission_log.service";
import MissionLogController from "../controllers/mission_log.controller";

export function registerMissionLogDependencies() {
  
  container.registerSingleton(MissionLogRepo, MissionLogRepo);
  container.registerSingleton(MissionLogService, MissionLogService);
  container.registerSingleton(MissionLogController, MissionLogController);
}
