import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import MissionLogService from "../services/mission_log.service";
import { HttpStatus } from "../utils/httpStatus";

/**
 * @description Controller for handling HTTP requests related to Mission Logs.
 * @class
 */
@injectable()
class MissionLogController {

  /**
   * @description Creates an instance of the MissionLogController.
   * @param {MissionLogService} missionLogService - The MissionLogService instance that handles business logic related to Mission Logs.
   */
  constructor(@inject(MissionLogService) private missionLogService: MissionLogService) {}

  /**
   * @description Handles the HTTP request to retrieve all mission log items.
   * @param {Request} req - The HTTP request object, which may contain query parameters for filtering logs (if needed).
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const missionLogItems = await this.missionLogService.getAllMissionLogItems();
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: missionLogItems,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }
}

export default MissionLogController;
