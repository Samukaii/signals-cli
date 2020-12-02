"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printEachResult = void 0;
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
const styles_1 = require("./styles");
const utils_1 = require("./utils");
function printEachResult(entrieResults) {
    entrieResults.map((result) => {
        const entrieResult = createEntrieResult(result);
        console.log(styles_1.colors.table(entrieResult));
    });
}
exports.printEachResult = printEachResult;
function createEntrieResult(result) {
    let gales = result.result.gale;
    let winOrLoss = result.result.winOrLoss;
    let profit = result.result.profitReceived;
    let profitSoFar = result.result.profitReceivedSoFar;
    let time = result.result.time;
    let profitText = profit.toString();
    let profitSoFarText = profitSoFar.toString();
    let winLossResult = `${winOrLoss} NO ${gales} GALE`;
    format();
    alignInternal();
    alignExternal();
    colorize();
    const all = [
        time,
        profitText,
        winLossResult,
        profitSoFarText
    ];
    return all.join('|');
    function alignInternal() {
        profitText = utils_1.leftText(profitText, 10);
        winLossResult = utils_1.leftText(winLossResult, 17);
        profitSoFarText = utils_1.leftText(profitSoFarText, 10);
    }
    function alignExternal() {
        time = utils_1.centerText(time, styles_1.paddings.time);
        profitText = utils_1.centerText(profitText, styles_1.paddings.profitReceived);
        winLossResult = utils_1.centerText(winLossResult, styles_1.paddings.winOrLoss);
        profitSoFarText = utils_1.centerText(profitSoFarText, styles_1.paddings.profitSoFar);
    }
    function format() {
        profitText = `R$ ${profit.toFixed(2)}`;
        profitSoFarText = `R$ ${profitSoFar.toFixed(2)}`;
        time = `[${time}]`;
        winLossResult = (noGale(gales))
            ? `${winOrLoss} SEM GALE`
            : `${winOrLoss} NO ${gales}° GALE`;
    }
    function colorize() {
        time = chalk_1.default.magentaBright(time);
        winLossResult =
            (isDraw(winOrLoss))
                ? chalk_1.default.blueBright(winLossResult)
                : (isWin(winOrLoss))
                    ? chalk_1.default.greenBright(winLossResult)
                    : chalk_1.default.redBright(winLossResult);
        profitText =
            (helpers_1.isNegative(profit))
                ? chalk_1.default.redBright(profitText)
                : chalk_1.default.greenBright(profitText);
        profitSoFarText =
            (helpers_1.isNegative(profitSoFar))
                ? chalk_1.default.redBright(profitSoFarText)
                : chalk_1.default.greenBright(profitSoFarText);
    }
}
function isWin(winOrLoss) {
    return winOrLoss.toLowerCase() === "win";
}
function isDraw(winOrLoss) {
    return winOrLoss.toLowerCase() === "equal";
}
function noGale(gale) {
    return gale === 0;
}
