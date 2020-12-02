"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntryResult = void 0;
const scriptconfig_json_1 = __importDefault(require("../../config/scriptconfig.json"));
const scrapper_1 = require("./scrapper");
const utils_1 = require("./utils");
function getWinValue(line) {
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: (\w*.?\w*) \| Perda: -*\w*.?\w*/;
    let winValues = scrapper_1.scrappLine(line, regex);
    if (typeof winValues !== "undefined")
        winValues = parseFloat(winValues);
    return winValues;
}
function getLossValue(line) {
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: \w*.?\w* \| Perda: (-*\w*.?\w*)/;
    let lossValues = scrapper_1.scrappLine(line, regex);
    if (typeof lossValues !== "undefined")
        lossValues = parseFloat(lossValues);
    return lossValues;
}
function getEntriesInvested(line) {
    const regex = /Ordem: \w* \| \w* \| Valor: (\w*.?\w*) \| Ganho: \w*/;
    let result = scrapper_1.scrappLine(line, regex);
    if (typeof result !== "undefined")
        result = parseFloat(result);
    return result;
}
function getGales(line) {
    let initialEntry = scriptconfig_json_1.default.initial_entry;
    let galefactor = scriptconfig_json_1.default.gale_factor;
    let entriesValues = getEntriesInvested(line);
    let gales;
    if (typeof entriesValues !== "undefined") {
        const factorMultiple = entriesValues / initialEntry;
        gales = Math.log10(factorMultiple) / Math.log10(galefactor);
        gales = Math.round(gales);
    }
    return gales;
}
function getTimes(line) {
    const regex = /\w{4}-\w{2}-\w{2} (\w{2}:\w{2}:\w{2})/;
    return scrapper_1.scrappLine(line, regex);
}
function getProfitReceived(line) {
    let winValues = getWinValue(line);
    let lossValues = getLossValue(line);
    let profitReceived;
    if (typeof lossValues !== "undefined" && typeof winValues !== "undefined")
        profitReceived = winValues + lossValues;
    return profitReceived;
}
function getAllWinOrLoss(line) {
    const regex = /Ordem: \w* \| (\w*) \| Valor: \w*.?\w* \| Ganho: \w*/;
    let allWinLoss = scrapper_1.scrappLine(line, regex);
    return allWinLoss;
}
function getEntryResult(lines) {
    let results = [];
    let soFar = 0;
    lines.map((line, index) => {
        let time = getTimes(line);
        let profitReceived = getProfitReceived(line);
        if (profitReceived)
            soFar += profitReceived;
        let winLoss = getAllWinOrLoss(line);
        let gale = getGales(line);
        results.push({
            result: {
                time: time,
                profitReceived: profitReceived,
                winOrLoss: winLoss,
                gale,
                profitReceivedSoFar: soFar
            },
            lineIndex: index
        });
    });
    return utils_1.catchNotUndefinedEntryResults(results);
}
exports.getEntryResult = getEntryResult;
