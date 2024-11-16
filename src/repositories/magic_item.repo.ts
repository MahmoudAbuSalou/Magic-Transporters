import { injectable } from "tsyringe";
import MagicItem from "../models/magic_item.model";
import { Document } from "mongoose";

/**
 * @description Repository for interacting with MagicItem data in the database.
 * @class
 */
@injectable()
class MagicItemRepo {

  /**
   * @description Creates a new MagicItem and saves it to the database.
   * @param {any} data - The data to create the new MagicItem.
   * @returns {Promise<Document>} A promise that resolves to the saved MagicItem document.
   */
  async createMagicItem(data: any): Promise<Document> {
    const magicItem = new MagicItem(data);
    return magicItem.save();
  }

  /**
   * @description Retrieves all MagicItems from the database.
   * @returns {Promise<Document[]>} A promise that resolves to an array of MagicItem documents.
   */
  async getAllItems(): Promise<Document[]> {
    return MagicItem.find();
  }
}

export default MagicItemRepo;
