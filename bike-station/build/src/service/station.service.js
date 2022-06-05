"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getWeatherByCity = exports.getStations = exports.deleteStation = exports.findAndUpdateStation = exports.findStationAt = exports.findStation = exports.createStation = void 0;
var station_model_1 = __importDefault(require("../models/station.model"));
var metrics_1 = require("../utils/metrics");
var node_fetch_1 = __importDefault(require("node-fetch"));
function createStation(input) {
    return __awaiter(this, void 0, void 0, function () {
        var metricsLabels, timer, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metricsLabels = {
                        operation: "createStation",
                    };
                    timer = metrics_1.databaseResponseTimeHistogram.startTimer();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, station_model_1.default.create(input)];
                case 2:
                    result = _a.sent();
                    timer(__assign(__assign({}, metricsLabels), { success: "true" }));
                    return [2 /*return*/, result];
                case 3:
                    e_1 = _a.sent();
                    timer(__assign(__assign({}, metricsLabels), { success: "false" }));
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createStation = createStation;
function findStation(query, options) {
    if (options === void 0) { options = { lean: true }; }
    return __awaiter(this, void 0, void 0, function () {
        var metricsLabels, timer, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metricsLabels = {
                        operation: "findStation",
                    };
                    timer = metrics_1.databaseResponseTimeHistogram.startTimer();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, station_model_1.default.findOne(query, {}, options)];
                case 2:
                    result = _a.sent();
                    timer(__assign(__assign({}, metricsLabels), { success: "true" }));
                    return [2 /*return*/, result];
                case 3:
                    e_2 = _a.sent();
                    timer(__assign(__assign({}, metricsLabels), { success: "false" }));
                    throw e_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findStation = findStation;
function findStationAt(condition) {
    return __awaiter(this, void 0, void 0, function () {
        var metricsLabels, timer, result, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metricsLabels = {
                        operation: "findStationAt",
                    };
                    timer = metrics_1.databaseResponseTimeHistogram.startTimer();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, station_model_1.default.find(condition)];
                case 2:
                    result = _a.sent();
                    timer(__assign(__assign({}, metricsLabels), { success: "true" }));
                    return [2 /*return*/, result];
                case 3:
                    e_3 = _a.sent();
                    timer(__assign(__assign({}, metricsLabels), { success: "false" }));
                    throw e_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findStationAt = findStationAt;
function findAndUpdateStation(query, update, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, station_model_1.default.findOneAndUpdate(query, update, options)];
        });
    });
}
exports.findAndUpdateStation = findAndUpdateStation;
function deleteStation(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, station_model_1.default.deleteOne(query)];
        });
    });
}
exports.deleteStation = deleteStation;
function getStations() {
    return __awaiter(this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)('https://kiosks.bicycletransit.workers.dev/phl', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log('result is: ', JSON.stringify(result, null, 4));
                    return [2 /*return*/, result.features];
            }
        });
    });
}
exports.getStations = getStations;
function getWeatherByCity(city, appId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId;
                    return [4 /*yield*/, (0, node_fetch_1.default)(url, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log('result is: ', JSON.stringify(result, null, 4));
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getWeatherByCity = getWeatherByCity;
