"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var pino_1 = require("pino");
var COLORIZE = process.env["COLORIZE"] === "true" ? true : process.env["COLORIZE"] === "false" ? false : process.stdout.isTTY;
exports.logger = (0, pino_1.pino)({
    level: process.env["LOG_LEVEL"] || "info",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: COLORIZE,
            singleLine: true,
        },
    },
});
