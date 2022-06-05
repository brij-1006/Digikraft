import mongoose from "mongoose";

export interface StationInputType {
  at: Date;
  stations: [
    { 
      geometry: { 
        coordinates: [number , number],
        type : string
      },
      properties: {
        id: number,
        name: string, 
        coordinates: [number , number],
        totalDocks: number,
        docksAvailable : number,
        bikesAvailable:  number,
        classicBikesAvailable: number,
        smartBikesAvailable:  number,
        electricBikesAvailable:  number,
        rewardBikesAvailable:  number,
        rewardDocksAvailable:  number,
        kioskStatus: string,
        kioskPublicStatus:  string,
        kioskConnectionStatus:   string,
        kioskType: number,
        addressStreet: string,
        addressCity: string,
        addressState: string,
        addressZipCode:  string,
        bikes: [
          {
            dockNumber: number,
            isElectric: boolean,
            isAvailable : boolean,
            battery: string,
          }
        ],
        closeTime: string,
        eventEnd: string,
        eventStart:  string,
        isEventBased:boolean,
        isVirtual:  boolean,
        kioskId: number,
        notes: string,
        openTime:  string,
        publicText:  string,
        timeZone:  string,
        trikesAvailable:  string,
        latitude:  string,
        longitude: string,
      },
      type: string
   }
  ];
  weather:  {
        coord: {
              lon: string,
              lat: string,
          },
        weather: [
                  {
                      id: number,
                      main: string,
                      description: string,
                      icon: string,
                  }
              ],
        base: string,
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            humidity: number,
        },
        visibility: number,
        wind: {
            speed: number,
            deg: number,
        },
        clouds: {
            all: number
        },
        dt: number,
        sys: {
            type: number,
            id: number,
            country: string,
            sunrise: number,
            sunset: number,
        },
        timezone: number,
        id: number,
        name: string,
        cod: number,
    };
}

export interface StationDocument extends StationInputType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const stationSchema = new mongoose.Schema(
  { 
    at: { type: Date},
    stations:[
      { 
        geometry: { 
          coordinates: [Number , Number],
          type: {type: String}
        },
        properties: {
          id: Number,
          name: String, 
          coordinates: [Number , Number],
          totalDocks: Number,
          docksAvailable : Number,
          bikesAvailable:  Number,
          classicBikesAvailable: Number,
          smartBikesAvailable:  Number,
          electricBikesAvailable:  Number,
          rewardBikesAvailable:  Number,
          rewardDocksAvailable:  Number,
          kioskStatus: String,
          kioskPublicStatus:  String,
          kioskConnectionStatus:   String,
          kioskType: Number,
          addressStreet: String,
          addressCity: String,
          addressState: String,
          addressZipCode:  String,
          bikes: [
            {
              dockNumber: Number,
              isElectric: Boolean,
              isAvailable : Boolean,
              battery: String,
            }
          ],
          closeTime: String,
          eventEnd: String,
          eventStart:  String,
          isEventBased:Boolean,
          isVirtual:  Boolean,
          kioskId: Number,
          notes: String,
          openTime:  String,
          publicText:  String,
          timeZone:  String,
          trikesAvailable:  String,
          latitude:  String,
          longitude: String,
        },
        type: {type: String}
     }
    ],
    weather: {
        coord: {
            lon: String,
            lat: String
        },
        weather: [
                {
                    id: Number,
                    main: String,
                    description: String,
                    icon: String,
                }
            ],
            base: String,
            main: {
                temp: Number,
                feels_like: Number,
                temp_min: Number,
                temp_max: Number,
                pressure: Number,
                humidity: Number
            },
            visibility: Number,
            wind: {
                speed: Number,
                deg: Number
            },
            clouds: {
                all: Number
            },
            dt: Number,
            sys: {
                type: {type: Number},
                id: Number,
                country: String,
                sunrise: Number,
                sunset: Number
            },
            timezone: Number,
            id: Number,
            name: String,
            cod: Number
        },
  }
);





const StationModel = mongoose.model<StationDocument>("Station", stationSchema);

export default StationModel;
