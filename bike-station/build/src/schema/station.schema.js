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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStationAtSchema = exports.createStationSchema = void 0;
var zod_1 = require("zod");
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
var payload = {
    body: (0, zod_1.object)({
        at: (0, zod_1.date)({
            required_error: "At is required",
        }),
        stations: (0, zod_1.string)({
            required_error: "Description is required",
        }),
        weather: (0, zod_1.string)({
            required_error: "Price is required",
        }),
    }),
};
var at = {
    params: (0, zod_1.object)({
        at: (0, zod_1.string)({
            required_error: "at is required",
        }),
    }),
};
exports.createStationSchema = (0, zod_1.object)(__assign({}, payload));
exports.getStationAtSchema = (0, zod_1.object)(__assign({}, at));
