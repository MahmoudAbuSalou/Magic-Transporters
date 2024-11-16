import "reflect-metadata"
import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger";

import magicItemsRoute from "./magic_item.route";
import magicMoversRoute from "./magic_mover.route";
import missionRoute from "./mission_log.route";


import { registerAllDependencies } from "../container";

export default class Routes {
  constructor(app: Application) {
    
    // Register all dependencies
    registerAllDependencies();

    // Swagger and routes setup
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use("/api/magic-movers", magicMoversRoute);
    app.use("/api/magic-items", magicItemsRoute);
    app.use("/api/mission-log", missionRoute);
  }


}
