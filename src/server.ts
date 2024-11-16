import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Application } from "express";
import AppDataSource from "./config/DB/db.connection";
import Server from "./index";
import LoggerService from "./utils/handlers/errorHandler";

const logger = LoggerService.getInstance("server");

/**
 * @description Initializes the Express application by connecting to the database and setting up middleware/routes.
 * @returns {Promise<Application>} The Express application instance.
 */
 async function initializeApp(): Promise<Application> {
  // Connect to the database
  await AppDataSource.connect();
  
  // Initialize the Express app
  const app: Application = express();
  
  // Configure middleware and routes
  new Server(app); 
  
  // Return the app instance after configuration
  return app;
}

/**
 * @description Starts the server by first initializing the application.
 * It sets up the connection to the database, starts the Express app,
 * and listens on a specified port.
 * @returns {void}
 */
async function startServer() {
  try {
    // Initialize the application and start the server
    initializeApp().then(app => {
      // Get the port from environment variables or default to 3000
      const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      
      // Start the Express server and listen for incoming requests
      app.listen(port, "localhost", () => {
        logger.info(`Server running on : http://localhost:${port}`);
      }).on("error", (err: any) => {
        // Handle server startup errors
        if (err.code === "EADDRINUSE") {
          logger.error("server startup error: address already in use");
        } else {
          logger.error(err);
        }
      });
    }).catch(error => {
      // Handle errors during app initialization
      logger.error("Error initializing the application:", error);
      process.exit(1);
    });
  } catch (error) {
     // Handle errors during database connection
     logger.error("Error connecting to the database:", error);
     process.exit(1);
  }
}

// Start the server
startServer();

/**
 * @description Exports the `initializeApp` function for potential future use.
 */
export { initializeApp };
