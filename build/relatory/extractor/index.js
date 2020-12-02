"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**@type {import('./extractor')} */
const entriesResult_1 = require("./entriesResult");
const stats_1 = require("./stats");
function createExtractor(content) {
    const removeSpaces = (fileContent) => fileContent.trim();
    const putFileLinesInArray = (fileContent) => fileContent.split(/\r?\n/);
    let lines = putFileLinesInArray(removeSpaces(content));
    return {
        getEntryResult: () => entriesResult_1.getEntryResult(lines),
        getStats: () => stats_1.getStats(lines, content),
    };
}
exports.default = createExtractor;
