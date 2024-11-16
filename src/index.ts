import cors from "cors";
import { Application, urlencoded, json } from "express";
import helmet from "helmet";
import * as winston from "winston";
import errorHandler from "./middlewares/globalError";
import LoggerService from "./utils/handlers/errorHandler";
import Routes from "./routes";
import * as fs from "fs";
import { WriteStream } from "fs";
import * as path from "path";

// Create logger instance
const logger = LoggerService.getInstance("global");

/**
 * @description Configures the Express application by setting up middleware and logging.
 * @class
 */
export default class Server {
  /**
   * @description Initializes the Server instance by configuring middleware and setting up routes.
   * @param {Application} app - The Express application instance.
   */
  constructor(app: Application) {
    this.config(app);
    new Routes(app); // Ensure routes are set up
  }

  /**
   * @description Configures the Express application with various middlewares and settings.
   * @param {Application} app - The Express application instance to configure.
   * @returns {void}
   */
  public config(app: Application): void {
    // Ensure logs folder exists
    const logsDirectory = path.join(__dirname, './logs');
    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory); // Create logs directory if it doesn't exist
    }

    // Set up the access log stream
    const accessLogStream: WriteStream = fs.createWriteStream(
      path.join(__dirname, "./logs/access.log"),
      { flags: "a" }
    );

    // Use middlewares in the specified order
    app.use(cors()); // Enable Cross-Origin Resource Sharing
    app.use(json()); // Parse incoming JSON requests
    app.use(urlencoded({ extended: true })); // Parse URL-encoded data
    app.use(helmet()); // Set security-related HTTP headers
    app.use(errorHandler); // Global error handler middleware
  }
}

// Global error handlers

/**
 * @description Handles uncaught exceptions by logging the error and exiting the application.
 * @param {Error} error - The uncaught exception error.
 * @returns {void}
 */
process.on("uncaughtException", (error) => {
  logger.error("Application exiting due to uncaught exception", error);
  process.exit(1); // Exit after logging
});

/**
 * @description Handles unhandled promise rejections by logging the reason and exiting the application.
 * @param {any} reason - The reason for the unhandled rejection.
 * @returns {void}
 */
process.on("unhandledRejection", (reason) => {
  logger.error("Application exiting due to unhandled rejection", reason);
  process.exit(1); // Exit after logging
});

/**
 * @description Handles the beforeExit process event, logging the exit code.
 * @param {number} code - The exit code of the process.
 * @returns {void}
 */
process.on("beforeExit", (code) => {
  logger.info(`Process beforeExit with code: ${code}`);
});
