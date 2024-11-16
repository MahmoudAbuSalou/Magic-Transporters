import { injectable } from "tsyringe";
import MagicMover from "../models/magic_mover.model";
import { Document } from "mongoose";
import { IMagicMover } from "../models/magic_mover.model";

/**
 * @description Repository for interacting with MagicMover data in the database.
 * @class
 */
@injectable()
class MagicMoverRepo {

  /**
   * @description Creates a new MagicMover and saves it to the database.
   * @param {any} data - The data to create the new MagicMover.
   * @returns {Promise<Document>} A promise that resolves to the saved MagicMover document.
   */
  async createMagicMover(data: any): Promise<Document> {
    const magicMover = new MagicMover(data);
    return magicMover.save();
  }

  /**
   * @description Finds a MagicMover by its ID and populates its associated items.
   * @param {string} magicMoverId - The ID of the MagicMover to find.
   * @returns {Promise<IMagicMover | null>} A promise that resolves to the MagicMover document or null if not found.
   */
  async findMagicMoverById(magicMoverId: string): Promise<IMagicMover | null> {
    return MagicMover.findById(magicMoverId).populate("items");
  }

  /**
   * @description Updates a MagicMover by its ID with the given data.
   * @param {string} id - The ID of the MagicMover to update.
   * @param {any} data - The data to update the MagicMover with.
   * @returns {Promise<Document | null>} A promise that resolves to the updated MagicMover document or null if not found.
   */
  async updateMagicMover(id: string, data: any): Promise<Document | null> {
    return MagicMover.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * @description Retrieves the MagicMovers sorted by the number of completed missions in descending order.
   * @returns {Promise<Document[]>} A promise that resolves to an array of MagicMover documents sorted by completed missions.
   */
  async getMostCompletedMissions(): Promise<Document[]> {
    return MagicMover.find().sort({ missionsCompleted: -1 });
  }

  /**
   * @description Retrieves all MagicMovers and populates their associated items.
   * @returns {Promise<Document[]>} A promise that resolves to an array of all MagicMover documents with populated items.
   */
  async getAllMovers(): Promise<Document[]> {
    return MagicMover.find().populate("items");
  }
}

export default MagicMoverRepo;
