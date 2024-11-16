import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import MagicMoverService from "../services/magic_mover.service";
import { HttpStatus } from "../utils/httpStatus";

/**
 * @description Controller for handling HTTP requests related to MagicMovers.
 * @class
 */
@injectable()
class MagicMoverController {
  
  /**
   * @description Creates an instance of the MagicMoverController.
   * @param {MagicMoverService} magicMoverService - The MagicMoverService instance for handling business logic related to MagicMovers.
   */
  constructor(
    @inject(MagicMoverService) private magicMoverService: MagicMoverService
  ) {}

  /**
   * @description Handles the HTTP request to create a new MagicMover.
   * @param {Request} req - The HTTP request object containing the new MagicMover data in `req.body`.
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const magicMover = await this.magicMoverService.createMagicMover(req.body);
      res.status(HttpStatus.Created.code).json({
        message: HttpStatus.Created.description,
        data: magicMover,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }

  /**
   * @description Handles the HTTP request to load items into a MagicMover.
   * @param {Request} req - The HTTP request object containing the MagicMover ID and item IDs in `req.body`.
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async load(req: Request, res: Response): Promise<void> {
    try {
      const { magicMoverId, itemIds } = req.body;
      const updatedMover = await this.magicMoverService.loadItems(magicMoverId, itemIds);
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: updatedMover,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }

  /**
   * @description Handles the HTTP request to start a mission for a MagicMover.
   * @param {Request} req - The HTTP request object containing the MagicMover ID in `req.body`.
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async startMission(req: Request, res: Response): Promise<void> {
    try {
      const { magicMoverId } = req.body;
      const updatedMover = await this.magicMoverService.startMission(magicMoverId);
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: updatedMover,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }

  /**
   * @description Handles the HTTP request to end a mission for a MagicMover.
   * @param {Request} req - The HTTP request object containing the MagicMover ID in `req.body`.
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async endMission(req: Request, res: Response): Promise<void> {
    try {
      const { magicMoverId } = req.body;
      const updatedMover = await this.magicMoverService.endMission(magicMoverId);
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: updatedMover,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }

  /**
   * @description Handles the HTTP request to get the MagicMovers with the most completed missions.
   * @param {Request} req - The HTTP request object, not used in this case.
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async getMostCompleted(req: Request, res: Response): Promise<void> {
    try {
      const movers = await this.magicMoverService.getMostCompletedMissions();
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: movers,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }

  /**
   * @description Handles the HTTP request to get all MagicMovers.
   * @param {Request} req - The HTTP request object, not used in this case.
   * @param {Response} res - The HTTP response object used to send the response to the client.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const magicMovers = await this.magicMoverService.getAllItems();
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: magicMovers,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST.code).json({
        message: error || HttpStatus.BAD_REQUEST.description,
      });
    }
  }
}

export default MagicMoverController;
