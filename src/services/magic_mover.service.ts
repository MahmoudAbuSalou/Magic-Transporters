import { injectable, inject } from "tsyringe";
import MagicMoverRepo from "../repositories/magic_mover.repo";
import MagicItem from "../models/magic_item.model";
import MissionLogRepo from "../repositories/mission_log.repo"; // Assuming a mission log repository

/**
 * @description Service that handles business logic related to Magic Movers.
 * @class
 */
@injectable()
class MagicMoverService {

  /**
   * @description Creates an instance of the MagicMoverService.
   * @param {MagicMoverRepo} magicMoverRepo - The MagicMoverRepo instance that handles data operations for Magic Movers.
   * @param {MissionLogRepo} missionLogRepo - The MissionLogRepo instance for handling mission logs.
   */
  constructor(
    @inject(MagicMoverRepo) private magicMoverRepo: MagicMoverRepo,
    @inject(MissionLogRepo) private missionLogRepo: MissionLogRepo
  ) {}

  /**
   * @description Creates a new magic mover.
   * @param {any} data - The data used to create a new magic mover.
   * @returns {Promise<any>} A promise that resolves to the created magic mover.
   */
  async createMagicMover(data: any) {
    return this.magicMoverRepo.createMagicMover(data);
  }

  /**
   * @description Loads items onto the magic mover, checking weight limits and other conditions.
   * @param {string} magicMoverId - The ID of the magic mover.
   * @param {string[]} itemIds - Array of item IDs to be loaded.
   * @returns {Promise<any>} A promise that resolves to the updated magic mover.
   * @throws {Error} If the magic mover is on a mission or the total weight exceeds the weight limit.
   */
  async loadItems(magicMoverId: string, itemIds: string[]) {
    const magicMover = await this.magicMoverRepo.findMagicMoverById(magicMoverId);
    if (!magicMover) throw new Error("Magic Mover not found.");
    if (magicMover.questState === "on-mission") throw new Error("Cannot load items while on a mission.");

    const items = await MagicItem.find({ _id: { $in: itemIds } });
    if (items.length !== itemIds.length) throw new Error("One or more items not found.");

    const currentLoadedWeight = items.reduce((acc, item) => acc + item.weight, 0);
    const loadedWeight = (magicMover.items as any[]).reduce((acc, item) => acc + item.weight, 0);
    const totalWeight = currentLoadedWeight + loadedWeight;

    if (totalWeight > magicMover.weightLimit) throw new Error("Items exceed Magic Mover's weight limit.");

    magicMover.items.push(...items);
    await magicMover.save();
    await this.missionLogRepo.createLog(magicMoverId, "loading");

    return magicMover;
  }

  /**
   * @description Starts the mission for the magic mover, changing its quest state.
   * @param {string} magicMoverId - The ID of the magic mover.
   * @returns {Promise<any>} A promise that resolves to the updated magic mover.
   * @throws {Error} If the magic mover is already on a mission.
   */
  async startMission(magicMoverId: string) {
    const magicMover = await this.magicMoverRepo.findMagicMoverById(magicMoverId);
    if (!magicMover) throw new Error("Magic Mover not found.");
    if (magicMover.questState === "on-mission") throw new Error("Already on a mission.");

    magicMover.questState = "on-mission";
    await magicMover.save();
    await this.missionLogRepo.createLog(magicMoverId, "on-mission");

    return magicMover;
  }

  /**
   * @description Ends the mission for the magic mover, unloading items and resetting its state.
   * @param {string} magicMoverId - The ID of the magic mover.
   * @returns {Promise<any>} A promise that resolves to the updated magic mover.
   * @throws {Error} If the magic mover is already in a resting state or mission has already ended.
   */
  async endMission(magicMoverId: string) {
    const magicMover = await this.magicMoverRepo.findMagicMoverById(magicMoverId);
    if (!magicMover) throw new Error("Magic Mover not found.");
    if (magicMover.questState === "resting") throw new Error("Mission already ended.");

    magicMover.items = []; 
    magicMover.questState = "resting";
    magicMover.missionsCompleted += 1;

    await magicMover.save();
    await this.missionLogRepo.createLog(magicMoverId, "unloading");

    return magicMover;
  }

  /**
   * @description Retrieves the magic movers with the most completed missions.
   * @returns {Promise<any[]>} A promise that resolves to a list of magic movers sorted by completed missions.
   */
  async getMostCompletedMissions() {
    return this.magicMoverRepo.getMostCompletedMissions();
  }

  /**
   * @description Retrieves all magic movers.
   * @returns {Promise<any[]>} A promise that resolves to a list of all magic movers.
   */
  async getAllItems() {
    return this.magicMoverRepo.getAllMovers();
  }
}

export default MagicMoverService;
