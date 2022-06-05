"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var stationSchema = new mongoose_1.default.Schema({
    at: { type: Date },
    stations: [
        {
            geometry: {
                coordinates: [Number, Number],
                type: { type: String }
            },
            properties: {
                id: Number,
                name: String,
                coordinates: [Number, Number],
                totalDocks: Number,
                docksAvailable: Number,
                bikesAvailable: Number,
                classicBikesAvailable: Number,
                smartBikesAvailable: Number,
                electricBikesAvailable: Number,
                rewardBikesAvailable: Number,
                rewardDocksAvailable: Number,
                kioskStatus: String,
                kioskPublicStatus: String,
                kioskConnectionStatus: String,
                kioskType: Number,
                addressStreet: String,
                addressCity: String,
                addressState: String,
                addressZipCode: String,
                bikes: [
                    {
                        dockNumber: Number,
                        isElectric: Boolean,
                        isAvailable: Boolean,
                        battery: String,
                    }
                ],
                closeTime: String,
                eventEnd: String,
                eventStart: String,
                isEventBased: Boolean,
                isVirtual: Boolean,
                kioskId: Number,
                notes: String,
                openTime: String,
                publicText: String,
                timeZone: String,
                trikesAvailable: String,
                latitude: String,
                longitude: String,
            },
            type: { type: String }
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
            type: { type: Number },
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
});
var StationModel = mongoose_1.default.model("Station", stationSchema);
exports.default = StationModel;
