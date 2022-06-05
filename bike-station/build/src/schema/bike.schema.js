"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBikeSchema = void 0;
var zod_1 = require("zod");
exports.createBikeSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        geometry: (0, zod_1.object)(),
        properties: (0, zod_1.object)(),
    }),
});
