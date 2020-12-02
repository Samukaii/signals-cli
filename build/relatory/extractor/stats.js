"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = void 0;
const filter_1 = require("../filter");
const entriesResult_1 = require("./entriesResult");
const scrapper_1 = require("./scrapper");
const utils_1 = require("./utils");
function getWinsCount(lines) {
    return utils_1.catchNotUndefinedResults(entriesResult_1.getEntryResult(lines)).reduce((acumulador, valor) => {
        let winOrLoss = valor.result.winOrLoss;
        if (winOrLoss.toLowerCase() == "win")
            return acumulador += 1;
        return acumulador;
    }, 0);
}
function getLossCount(lines) {
    return utils_1.catchNotUndefinedResults(entriesResult_1.getEntryResult(lines)).reduce((acumulador, valor) => {
        let winOrLoss = valor.result.winOrLoss;
        if (winOrLoss.toLowerCase() == "loss")
            return acumulador += 1;
        return acumulador += 0;
    }, 0);
}
function getDrawsCount(lines) {
    return utils_1.catchNotUndefinedResults(entriesResult_1.getEntryResult(lines)).reduce((acumulador, valor) => {
        let winOrLoss = valor.result.winOrLoss;
        if (winOrLoss.toLowerCase() == "equal")
            return acumulador += 1;
        return acumulador += 0;
    }, 0);
}
function getAccuracy(lines) {
    let total = utils_1.catchNotUndefinedEntryResults(entriesResult_1.getEntryResult(lines)).length;
    let accuracy = (getWinsCount(lines) / total) * 100;
    return accuracy.toPrecision(4);
}
function getTotalProfit(lines) {
    return utils_1.catchNotUndefinedResults(entriesResult_1.getEntryResult(lines)).reduce((acumulador, valor) => {
        let totalProfit = valor.result.profitReceived;
        if (totalProfit)
            return acumulador += totalProfit;
        return acumulador += 0;
    }, 0).toFixed(2);
}
function getParcialProfit(lines) {
    let filtered = filter_1.filterEntries(utils_1.catchNotUndefinedResults(entriesResult_1.getEntryResult(lines)));
    return utils_1.catchNotUndefinedResults(filtered).reduce((acumulador, valor) => {
        let totalProfit = valor.result.profitReceived;
        if (totalProfit)
            return acumulador += totalProfit;
        return acumulador += 0;
    }, 0).toFixed(2);
}
function getInitialBalance(content) {
    const regex = /INFO:Saldo: (\w*.?\w*)/;
    const result = scrapper_1.scrappLine(content, regex);
    if (typeof result === "undefined")
        return "";
    return result;
}
function getStopLoss(content) {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: \w*.?\w* \| StopLoss: (\w*.?\w*)/;
    let stopLossHistory = utils_1.catchNotUndefinedResults(scrapper_1.scrappContentAndConvertToNumber(content, regex));
    return getLast().result;
    function getLast() {
        return stopLossHistory[stopLossHistory.length - 1];
    }
}
function getTakeProfit(lines) {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: (\w*.?\w*) \| StopLoss: \w*.?\w*/;
    let takeProfitHistory = utils_1.catchNotUndefinedResults(scrapper_1.scrappContentAndConvertToNumber(lines, regex));
    return getLast().result;
    function getLast() {
        return takeProfitHistory[takeProfitHistory.length - 1];
    }
}
function getStats(lines, content) {
    return {
        stopLoss: getStopLoss(lines),
        takeProfit: getTakeProfit(lines),
        initialBalance: getInitialBalance(content),
        totalProfit: parseFloat(getTotalProfit(lines)),
        parcialProfit: parseFloat(getParcialProfit(lines)),
        allResults: utils_1.catchNotUndefinedEntryResults(entriesResult_1.getEntryResult(lines)).length,
        winsCount: getWinsCount(lines),
        lossCount: getLossCount(lines),
        drawsCount: getDrawsCount(lines),
        accuracy: getAccuracy(lines)
    };
}
exports.getStats = getStats;
