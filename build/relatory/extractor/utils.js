"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchNotUndefinedEntryResults = exports.catchNotUndefinedResults = void 0;
const helpers_1 = require("../../helpers");
function catchNotUndefinedResults(results) {
    let res = [];
    results.map(result => {
        if (typeof result.result == "undefined")
            return;
        res.push(result);
    });
    return res;
}
exports.catchNotUndefinedResults = catchNotUndefinedResults;
function catchNotUndefinedEntryResults(results) {
    let res = [];
    results.map(entryInfo => {
        var _a, _b, _c, _d, _e;
        let time = (_a = entryInfo === null || entryInfo === void 0 ? void 0 : entryInfo.result) === null || _a === void 0 ? void 0 : _a.time;
        let winLoss = (_b = entryInfo === null || entryInfo === void 0 ? void 0 : entryInfo.result) === null || _b === void 0 ? void 0 : _b.winOrLoss;
        let profit = (_c = entryInfo === null || entryInfo === void 0 ? void 0 : entryInfo.result) === null || _c === void 0 ? void 0 : _c.profitReceived;
        let gale = (_d = entryInfo === null || entryInfo === void 0 ? void 0 : entryInfo.result) === null || _d === void 0 ? void 0 : _d.gale;
        let soFar = (_e = entryInfo === null || entryInfo === void 0 ? void 0 : entryInfo.result) === null || _e === void 0 ? void 0 : _e.profitReceivedSoFar;
        if (!entryInfo.result)
            return;
        if (helpers_1.isUndefineds(time, winLoss, soFar, gale, profit))
            return;
        res.push(entryInfo);
    });
    return res;
}
exports.catchNotUndefinedEntryResults = catchNotUndefinedEntryResults;
