import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import MagicItemService from "../services/magic_item.service";
import { HttpStatus } from "../utils/httpStatus";

/**
 * @description Controller for handling HTTP requests related to MagicItems.
 * @class
 */
@injectable()
export default class MagicItemController {
  
  /**
   * @description Creates an instance of the MagicItemController.
   * @param {MagicItemService} magicItemService - The MagicItemService instance for handling business logic related to MagicItems.
   */
  constructor(
    @inject(MagicItemService) private magicItemService: MagicItemService
  ) {}

  /**
   * @description Handles the HTTP request to create a new MagicItem.
   * @param {Request} req - The HTTP request object containing the new MagicItem data in `req.body`.
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const magicItem = await this.magicItemService.createMagicItem(req.body);
      res.status(HttpStatus.Created.code).json({
        message: HttpStatus.Created.description,
        data: magicItem,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }

  /**
   * @description Handles the HTTP request to get all MagicItems.
   * @param {Request} req - The HTTP request object, not used in this case.
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const magicItems = await this.magicItemService.getAllItems();
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: magicItems,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }
}
