"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = exports.paddings = exports.windowInfo = void 0;
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("./utils");
exports.windowInfo = {
    width: process.stdout.columns
};
exports.paddings = {
    time: utils_1.percentOfWindow(8),
    profitReceived: utils_1.percentOfWindow(25),
    winOrLoss: utils_1.percentOfWindow(25),
    profitSoFar: utils_1.percentOfWindow(25)
};
exports.colors = {
    table: chalk_1.default.blueBright,
    positive: chalk_1.default.greenBright.bold,
    negative: chalk_1.default.redBright.bold,
    cyan: chalk_1.default.cyanBright.bold,
    time: chalk_1.default.magentaBright,
    stats: chalk_1.default.yellowBright
};
