import { Request, Response } from "express";
import dayjs from "dayjs";

import {
  createStation,
  getStations,
  getWeatherByCity,
  findStation,
  findStationByKioskId
} from "../service/station.service";
import logger from "../utils/logger";



export async function bikeHandler( req: Request, res: Response) {

  try {
      const stationObj = await getStations();
      const weatherObj = await getWeatherByCity('Philadelphia','628fd114e6630fadda53a2e49b55dd43');

      if (!stationObj && !weatherObj) {
         return res.sendStatus(404);
      }

      const data = {at : dayjs().toDate(), stations: stationObj, weather: weatherObj};
      let result =  await createStation(data);

      return res.send(result);

  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }

}


export async function getBikeStationsAtHandler(req: Request, res: Response) {
  const { query } = req;
  const to:any = query.at;
  const start = new Date(to);
  console.log('=======START=======> ', start);
  const seconds = start.getSeconds();
  const minutes = start.getMinutes();
  const hour = start.getHours();
  const toDate = start.toLocaleDateString(`fr-CA`).split('/').join('-');

  const end = new Date(start.setSeconds(start.getSeconds() + 1)) ;
  console.log('======END============> ',end)


  const creationDate:any = {
    "at": {
      '$gte': `${toDate}T${hour}:${minutes}:${seconds}.000Z`,
      '$lt': `${toDate}T${hour}:${minutes}:${seconds}.999Z`
    }
  };
  console.log('======creationDate============> ',creationDate)
  
  const stations = await findStation(creationDate);
  console.log('======stations============> ',stations)
  if (!stations) {
    return res.sendStatus(404);
  }

  
  return res.send(stations);
}


export async function getOneBikeStationsAtATimeHandler(req: Request, res: Response) {

        try {
            const { query } = req;
            const to:any = query.at;
            const start = new Date(to);
            console.log('=======START=======> ', start);
            const seconds = start.getSeconds();
            const minutes = start.getMinutes();
            const hour = start.getHours();
            const toDate = start.toLocaleDateString(`fr-CA`).split('/').join('-');

            const end = new Date(start.setSeconds(start.getSeconds() + 1)) ;
            console.log('======END============> ',end);

            const kioskId = req.params.kioskId;
            console.log('======kioskId============> ',kioskId);


            const whereCondition:any = {
            "at": {
              '$gte': `${toDate}T${hour}:${minutes}:${seconds}.000Z`,
              '$lt': `${toDate}T${hour}:${minutes}:${seconds}.999Z`
            },
            "stations":  {  "$elemMatch": { "properties.kioskId":kioskId }  }
            };
            console.log('======creationDate============> ', whereCondition);

            //db.getCollection('stations').find({ "stations":  {  "$elemMatch": { "properties.kioskId":30041 }  }},{ 'stations.$': 1 })
            // db.getCollection('stations').find({"at": { '$gte': '2022-06-04T11:29:13.000Z', '$lt': '2022-06-04T11:29:13.999Z'}, "stations":  {  "$elemMatch": { "properties.kioskId":30041 }  }},{ 'stations.$': 1 })


            const station = await findStationByKioskId(whereCondition);
            console.log('======stations============> ',station)
            if (!station) {
            return res.status(409).send('Station data not found!');
            }

            return res.send(station);

        } catch (e: any) {
          logger.error(e);
          return res.status(409).send(e.message);
        }

}


export async function getOneBikeStationsTimeRangeHandler(req: Request, res: Response) {

  try {
      const { query } = req;
      const from:any = query.from;
      const start = new Date(from);
      console.log('=======START=======> ', start);

      const to:any = query.to;
      const end = new Date(to);
      console.log('======END============> ',end);

      const kioskId = req.params.id;
      console.log('======kioskId============> ',kioskId);

      const frequency:any = query.frequency?query.frequency:'hourly';
      console.log('======frequency============> ',frequency);


      const whereCondition:any = {
        "at": {
          '$gte': start,
          '$lt': end
        },
        "stations":  {  "$elemMatch": { "properties.kioskId":kioskId }  }
      };
      console.log('======creationDate============> ', whereCondition);

      const station = await findStationByKioskId(whereCondition);
      console.log('======stations============> ',station)
      if (!station) {
         return res.status(409).send('Station data not found!');
      }

      return res.send(station);

  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }

}

