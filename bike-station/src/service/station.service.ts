import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import StationModel, {
  StationDocument,
  StationInputType,
} from "../models/station.model";

import { databaseResponseTimeHistogram } from "../utils/metrics";
import fetch from 'node-fetch';



export async function createStation(input: StationInputType) {
  const metricsLabels = {
    operation: "createStation",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await StationModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findStation(
  query: FilterQuery<StationDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findStation",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
   
    let projection = { 
      __v: false,
      _id: false
  };
    const result = await StationModel.findOne(query, projection, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findStationByKioskId(
  query: FilterQuery<StationDocument>,
  options: QueryOptions = {  lean: true }
) {
  const metricsLabels = {
    operation: "findStation",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
   
    let projection = { 
        "_id" : 0,
        "at": 1,
        "stations.$": 1,
        "weather": 1
    };
    const result = await StationModel.findOne(query, projection, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findStationByRangeWithKioskId(
  query: FilterQuery<StationDocument>,
  options: QueryOptions = {  lean: true }
) {
  const metricsLabels = {
    operation: "findStation",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
   
    let projection = { 
        "_id" : 0,
        "at": 1,
        "stations.$": 1,
        "weather": 1
    };
    const result = await StationModel.findOne(query, projection, options).sort({at: -1}).limit(1);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}


export async function findAndUpdateStation(
  query: FilterQuery<StationDocument>,
  update: UpdateQuery<StationDocument>,
  options: QueryOptions
) {
  return StationModel.findOneAndUpdate(query, update, options);
}

export async function deleteStation(query: FilterQuery<StationDocument>) {
  return StationModel.deleteOne(query);
}

export async function getStations() {
const response = await fetch('https://kiosks.bicycletransit.workers.dev/phl', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const result = await response.json();
    console.log('result is: ', JSON.stringify(result, null, 4));
    return result.features;
}

export async function getWeatherByCity(city: string, appId: string) {

  //return process.env.GITHUB_AUTH_TOKEN;
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId;

  const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
  
      const result = await response.json();
      console.log('result is: ', JSON.stringify(result, null, 4));
      return result;


  }
