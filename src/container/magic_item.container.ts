import { container } from "tsyringe";
import MagicItemRepo from "../repositories/magic_item.repo";
import MagicItemService from "../services/magic_item.service";
import MagicItemController from "../controllers/magic_item.controller";
import MagicItem from "../models/magic_item.model";
export function registerMagicItemDependencies() {

  container.registerSingleton(MagicItemRepo, MagicItemRepo);
  container.registerSingleton(MagicItemService, MagicItemService);
  container.registerSingleton(MagicItemController, MagicItemController);
}
