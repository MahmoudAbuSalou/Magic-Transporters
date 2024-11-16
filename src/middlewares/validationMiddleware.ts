import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { HttpStatus } from "../utils/httpStatus";

export const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HttpStatus.BAD_REQUEST.code).json({
      message: "Validation error",
      errors: errors.array().map((error) => ({
       
        message: error.msg,
      })),
    });
    return;
  }

  next();
};

