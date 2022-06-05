import { object, number, string, TypeOf, date } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Station:
 *       type: object
 *       required:
 *        - at
 *        - stations
 *        - weather
 *       properties:
 *         at:
 *           type: string
 *         stations:
 *           type: string
 *         weather:
 *           type: string
 */

 const payload = {
  body: object({
    at: date({
      required_error: "At is required",
    }),
    stations: string({
      required_error: "Description is required",
    }),
    weather: string({
      required_error: "Price is required",
    }),
  }),
};


const at = {
  params: object({
    at: string({
      required_error: "at is required",
    }),
  }),
};

export const createStationSchema = object({
  ...payload,
});

export const getStationAtSchema = object({
  ...at,
});


export type CreateStationInput = TypeOf<typeof createStationSchema>;
export type ReadStationAtInput = TypeOf<typeof getStationAtSchema>;