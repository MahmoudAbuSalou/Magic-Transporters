import { container } from "tsyringe";
import MagicMoverRepo from "../repositories/magic_mover.repo";
import MagicMoverService from "../services/magic_mover.service";
import MagicMoverController from "../controllers/magic_mover.controller";

export function registerMagicMoverDependencies() {

  container.registerSingleton(MagicMoverRepo, MagicMoverRepo);
  container.registerSingleton(MagicMoverService, MagicMoverService);
  container.registerSingleton(MagicMoverController, MagicMoverController);
}
