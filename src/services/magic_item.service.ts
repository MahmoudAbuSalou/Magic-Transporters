import { injectable, inject } from "tsyringe";
import MagicItemRepo from "../repositories/magic_item.repo";

/**
 * @description Service that handles business logic related to Magic Items.
 * @class
 */
@injectable()
class MagicItemService {

  /**
   * @description Creates an instance of the MagicItemService.
   * @param {MagicItemRepo} magicItemRepo - The MagicItemRepo instance that handles data operations for Magic Items.
   */
  constructor(
    @inject(MagicItemRepo) private magicItemRepo: MagicItemRepo
  ) {}

  /**
   * @description Creates a new magic item.
   * @param {any} data - The data used to create a new magic item. This typically includes properties such as name and weight.
   * @returns {Promise<any>} A promise that resolves to the created magic item.
   */
  async createMagicItem(data: any) {
    return this.magicItemRepo.createMagicItem(data);
  }

  /**
   * @description Retrieves all magic items.
   * @returns {Promise<any[]>} A promise that resolves to an array of magic items.
   */
  async getAllItems() {
    return this.magicItemRepo.getAllItems();
  }
}

export default MagicItemService;
