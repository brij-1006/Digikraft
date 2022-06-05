"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBikeStationsAtHandler = exports.bikeHandler = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var station_service_1 = require("../service/station.service");
var logger_1 = __importDefault(require("../utils/logger"));
function bikeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stationObj, weatherObj, data, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, station_service_1.getStations)()];
                case 1:
                    stationObj = _a.sent();
                    return [4 /*yield*/, (0, station_service_1.getWeatherByCity)('Philadelphia', '628fd114e6630fadda53a2e49b55dd43')];
                case 2:
                    weatherObj = _a.sent();
                    if (!stationObj && !weatherObj) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    data = { at: (0, dayjs_1.default)().toDate(), stations: stationObj, weather: weatherObj };
                    return [4 /*yield*/, (0, station_service_1.createStation)(data)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
                case 4:
                    e_1 = _a.sent();
                    logger_1.default.error(e_1);
                    return [2 /*return*/, res.status(409).send(e_1.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.bikeHandler = bikeHandler;
function getBikeStationsAtHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, to, start, end, today, seconds, minutes, hour, creationDate, stations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = req.query;
                    to = query.at;
                    start = new Date(to);
                    console.log('=======START=======> ', start);
                    end = new Date(start.setSeconds(start.getSeconds() + 1));
                    console.log('======END============> ', end);
                    today = start.toLocaleDateString("fr-CA").split('/').join('-');
                    seconds = start.getSeconds();
                    minutes = start.getMinutes();
                    hour = start.getHours();
                    creationDate = {
                        "at": {
                            '$gte': today + "T" + hour + ":" + minutes + ":" + seconds + ".000Z",
                            '$lt': today + "T" + hour + ":" + minutes + ":" + seconds + ".999Z"
                        }
                    };
                    return [4 /*yield*/, (0, station_service_1.findStation)(creationDate)];
                case 1:
                    stations = _a.sent();
                    if (!stations) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    console.log('======stations============> ', stations);
                    return [2 /*return*/, res.send(stations)];
            }
        });
    });
}
exports.getBikeStationsAtHandler = getBikeStationsAtHandler;
