import { registerMagicItemDependencies } from "./magic_item.container";
import { registerMagicMoverDependencies } from "./magic_mover.container";
import { registerMissionLogDependencies } from "./mission_log.container";

/**
 * Registers all dependencies related to MagicItem, MagicMover, and MissionLog with the DI container.
 */
export function registerAllDependencies() {
  registerMagicItemDependencies();
  registerMagicMoverDependencies();
  registerMissionLogDependencies();
}
