import { injectable, inject } from "tsyringe";
import MissionLogRepo from "../repositories/mission_log.repo";

/**
 * @description Service that handles business logic related to mission logs.
 * @class
 */
@injectable()
class MissionLogService {

  /**
   * @description Creates an instance of the MissionLogService.
   * @param {MissionLogRepo} missionLogRepo - The MissionLogRepo instance that handles data operations for mission logs.
   */
  constructor(@inject(MissionLogRepo) private missionLogRepo: MissionLogRepo) {}

  /**
   * @description Retrieves all mission log items.
   * @returns {Promise<any[]>} A promise that resolves to a list of all mission log items.
   */
  async getAllMissionLogItems() {
    return this.missionLogRepo.getAllItems();
  }
}

export default MissionLogService;
