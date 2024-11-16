import { check } from "express-validator";

export const magicItemValidationRules = [
  check("name").notEmpty().withMessage("Name is required"),
  check("weight").isFloat({ gt: 0 }).withMessage("Weight must be a positive number"),
];
