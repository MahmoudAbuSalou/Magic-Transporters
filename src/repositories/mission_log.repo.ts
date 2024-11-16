import { injectable } from "tsyringe";
import MissionLog from "../models/missing_log.model";
import { Document } from "mongoose";

/**
 * @description Repository for interacting with MissionLog data in the database.
 * @class
 */
@injectable()
class MissionLogRepo {

  /**
   * @description Creates a new MissionLog entry and saves it to the database.
   * @param {string} magicMoverId - The ID of the MagicMover associated with this log entry.
   * @param {"loading" | "on-mission" | "unloading"} action - The action performed (either "loading", "on-mission", or "unloading").
   * @returns {Promise<Document>} A promise that resolves to the saved MissionLog document.
   */
  async createLog(
    magicMoverId: string,
    action: "loading" | "on-mission" | "unloading"
  ): Promise<Document> {
    const log = new MissionLog({
      magicMoverId,
      action,
      timestamp: new Date(),
    });
    return log.save();
  }

  /**
   * @description Retrieves all MissionLog entries from the database.
   * @returns {Promise<Document[]>} A promise that resolves to an array of MissionLog documents.
   */
  async getAllItems(): Promise<Document[]> {
    return MissionLog.find();
  }
}

export default MissionLogRepo;
