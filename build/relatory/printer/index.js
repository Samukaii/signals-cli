"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printResults = void 0;
const eachResult_1 = require("./eachResult");
const header_1 = require("./header");
const stats_1 = require("./stats");
function printResults(entryResults, stats) {
    header_1.printHeader();
    eachResult_1.printEachResult(entryResults);
    stats_1.printStats(stats);
}
exports.printResults = printResults;
