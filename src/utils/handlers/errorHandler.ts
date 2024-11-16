import * as winston from "winston";
import * as fs from "fs";
import * as path from "path";

class LoggerService {
  private logger: winston.Logger;
  private static instances: { [key: string]: LoggerService } = {};

  private constructor(route: string) {
    const logFilePath = process.env.LOG_FILE_PATH || "./logs";

    // Validate or create log directory
    if (!fs.existsSync(logFilePath)) {
      fs.mkdirSync(logFilePath, { recursive: true });
    }

    // Configure the winston logger
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || "info", // Make log level configurable via environment
      format: winston.format.combine(
        winston.format.timestamp({ format: () => new Date().toLocaleString() }),
        winston.format.printf((info) =>
          `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message} ${
            info.obj ? `| DATA: ${JSON.stringify(info.obj)}` : ""
          }`
        )
      ),
      transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({
          filename: path.join(logFilePath, `${route}.log`), // Log to file with dynamic name
        }),
      ],
    });
  }

  // Get or create a logger instance for each route (if needed)
  public static getInstance(route: string = "app"): LoggerService {
    if (!LoggerService.instances[route]) {
      LoggerService.instances[route] = new LoggerService(route);
    }
    return LoggerService.instances[route];
  }

  // Log info messages
  public info(message: string, obj?: any): void {
    this.logger.info(message, { obj });
  }

  // Log error messages
  public error(message: string, obj?: any): void {
    this.logger.error(message, { obj });
  }

  // Log debug messages
  public debug(message: string, obj?: any): void {
    this.logger.debug(message, { obj });
  }
}

export default LoggerService;
