"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHeader = void 0;
const utils_1 = require("./utils");
const styles_1 = require("./styles");
function printHeader() {
    let header = createHeader();
    console.log(styles_1.colors.table(utils_1.horizontalLine("all")));
    console.log(styles_1.colors.table(header));
    console.log(styles_1.colors.table(utils_1.horizontalLine("all")));
}
exports.printHeader = printHeader;
function createHeader() {
    let timeText = 'HORA';
    let profitReceivedText = 'LUCRO';
    let winOrLossText = 'RESULTADO';
    let profitSoFarText = 'SALDO';
    align();
    let all = [
        timeText,
        profitReceivedText,
        winOrLossText,
        profitSoFarText,
    ];
    colorize();
    return all.join('|');
    function align() {
        timeText = utils_1.centerText(timeText, styles_1.paddings.time);
        profitReceivedText = utils_1.centerText(profitReceivedText, styles_1.paddings.profitReceived);
        profitSoFarText = utils_1.centerText(profitSoFarText, styles_1.paddings.profitSoFar);
        winOrLossText = utils_1.centerText(winOrLossText, styles_1.paddings.winOrLoss);
    }
    function colorize() {
        all = all.map(a => {
            return styles_1.colors.positive(a);
        });
    }
}
