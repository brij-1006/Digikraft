import { Express, Request, Response } from "express";

import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";

import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

import { 
   bikeHandler,
   getBikeStationsAtHandler,
   getOneBikeStationsAtATimeHandler,
   getOneBikeStationsTimeRangeHandler
} from "./controller/bike.controller";


function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

// bike data process api callings are

/**
 * @openapi
 * '/api/v1/stations/add':
 *  get:
 *     tags:
 *     - Stations
 *     summary: Get a bike sharing data from indigo services
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/Station'
 *       404:
 *         description: Station not found
 */
 

app.get(
  "/api/v1/stations/add",
  bikeHandler
);

/**
 * @openapi
 * '/api/v1/stations/?at=2022-06-04T11:29:13':
 *  get:
 *     tags:
 *     - Stations for specific time 
 *     summary: Get a bike sharing data from database
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/Station'
 *       404:
 *         description: Station not found
 */

app.get("/api/v1/stations/",  getBikeStationsAtHandler);

// request geth  path :- {BASEURL}/api/v1/stations/30041?at=2022-06-04T11:29:13
app.get("/api/v1/stations/:kioskId",  getOneBikeStationsAtATimeHandler);
// request geth  path :- {BASEURL}/api/v1/stations/30041?from=2017-11-01T11:00:00&to=2017-12-01T11:00:00&frequency=daily
// for example url for below routing http://localhost:1337/api/v1/station/3004?from=2022-06-05T00:00:00&to=2022-06-05T23:59:59&frequency=daily  , here BASEURL=http://localhost:1337
app.get("/api/v1/station/:id",  getOneBikeStationsTimeRangeHandler);


}

export default routes;
