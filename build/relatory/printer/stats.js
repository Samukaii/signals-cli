"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printStats = void 0;
const styles_1 = require("./styles");
const utils_1 = require("./utils");
function printStats(stats) {
    const statsText = createStats(stats);
    console.log(styles_1.colors.table(utils_1.centerText(utils_1.horizontalLine("all"), styles_1.windowInfo.width)));
    console.log(styles_1.colors.stats(statsText));
    console.log(styles_1.colors.table(utils_1.centerText(utils_1.horizontalLine(70), styles_1.windowInfo.width)));
}
exports.printStats = printStats;
function createStats(statsResult) {
    let stats = Object.assign({}, statsResult);
    let line = utils_1.horizontalLine(35);
    let space = '';
    let totalProfit = stats.totalProfit.toString();
    let parcialProfit = stats.parcialProfit.toString();
    let takeProfit = stats.takeProfit.toString();
    let stopLoss = stats.stopLoss.toString();
    let allResults = stats.allResults.toString();
    let winsCount = stats.winsCount.toString();
    let lossCount = stats.lossCount.toString();
    let drawsCount = stats.drawsCount.toString();
    format();
    align();
    colorize();
    let all = [
        center('STATUS'),
        line,
        stats.initialBalance,
        totalProfit,
        takeProfit,
        stopLoss,
        space,
        center('EXIBIDO NA TELA'),
        line,
        parcialProfit,
        allResults,
        space,
        center('RESULTADOS'),
        line,
        lossCount,
        winsCount,
        drawsCount,
        space
    ];
    return all.join('\n');
    function align() {
        line = center(line);
        stats.initialBalance = center(stats.initialBalance),
            totalProfit = center(totalProfit);
        takeProfit = center(takeProfit);
        stopLoss = center(stopLoss);
        space = center(space);
        parcialProfit = center(parcialProfit);
        allResults = center(allResults);
        lossCount = center(lossCount);
        winsCount = center(winsCount);
        drawsCount = center(drawsCount);
    }
    function center(text) {
        return utils_1.centerText(text, styles_1.windowInfo.width);
    }
    function format() {
        stats.initialBalance = `COMO A BANCA ESTAVA ANTES DA OPERAÇÃO: R$ ${stats.initialBalance}`;
        totalProfit = `LUCRO TOTAL DESDE A PRIMEIRA OPERAÇÃO: R$ ${stats.totalProfit}`;
        parcialProfit = `LUCRO TOTAL EXIBIDO NA TELA: R$ ${stats.parcialProfit}`;
        takeProfit = `TAKEPROFIT: R$ ${stats.takeProfit}`;
        stopLoss = `STOPLOSS: R$ ${stats.stopLoss}`;
        allResults = `QUANTIDADE DE ENTRADAS EXIBIDAS AGORA: ${stats.allResults}`;
        lossCount = `QUANTIDADE DE LOSS: ${stats.lossCount}`;
        winsCount = `QUANTIDADE DE WINS: ${stats.winsCount}`;
        drawsCount = `QUANTIDADE DE EMPATES: ${stats.drawsCount}`;
    }
    function colorize() {
        totalProfit = (stats.totalProfit > 0)
            ? styles_1.colors.positive(totalProfit)
            : styles_1.colors.negative(totalProfit);
        parcialProfit = (stats.parcialProfit > 0)
            ? styles_1.colors.positive(parcialProfit)
            : styles_1.colors.negative(parcialProfit);
        lossCount = styles_1.colors.negative(lossCount);
        winsCount = styles_1.colors.positive(winsCount);
        drawsCount = styles_1.colors.table(drawsCount);
        line = styles_1.colors.stats(line);
    }
}
