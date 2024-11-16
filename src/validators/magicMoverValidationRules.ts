import { body, param } from "express-validator";

// Validation rules for the `create` route
export const createMagicMoverValidationRules = [
  body("weightLimit").isFloat({ gt: 0 }).withMessage("Weight limit must be a positive number"),
  body("questState")
    .isIn(["resting", "loading", "on-mission"])
    .withMessage("Quest state must be one of 'resting', 'loading', or 'on-mission'"),
  body("items").isArray().withMessage("Items should be an array"),
  body("missionsCompleted").isInt({ min: 0 }).withMessage("Missions completed must be a non-negative integer"),
];

// Validation rules for the `load` route
export const loadMagicMoverValidationRules = [
  body("magicMoverId").isString().notEmpty().withMessage("MagicMover ID is required"),
  body("itemIds")
    .isArray()
    .withMessage("Item IDs should be an array")
    .custom((value) => value.every((id:string) => typeof id === "string"))
    .withMessage("Each Item ID should be a string"),
];

// Validation rules for the `startMission` route
export const startMissionValidationRules = [
  body("magicMoverId").isString().notEmpty().withMessage("MagicMover ID is required"),
];

// Validation rules for the `endMission` route
export const endMissionValidationRules = [
  body("magicMoverId").isString().notEmpty().withMessage("MagicMover ID is required"),
];


