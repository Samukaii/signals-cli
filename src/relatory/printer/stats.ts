import { TStatsResult } from "types";
import { colors, windowInfo } from "./styles";
import { centerText, horizontalLine } from "./utils";

export function printStats(stats: TStatsResult) {
    const sta = createStats(stats);
    const statsText = `
        COMO A BANCA ESTAVA ANTES DA OPERAÇÃO: ${'R$ ' + stats.initialBalance}
        LUCRO TOTAL DESDE A PRIMEIRA OPERAÇÃO: ${'R$ ' + stats.totalProfit}
        LUCRO TOTAL EXIBIDO NA TELA: ${(1 < 0)
                ? 'R$ ' + stats.parcialProfit
                : 'R$ ' + stats.parcialProfit
            }

        TAKEPROFIT: ${stats.takeProfit}
        STOPLOSS: ${stats.stopLoss}

        QUANTIDADE DE ENTRADAS EXIBIDAS AGORA: ${stats.allResults}
        QUANTIDADE DE LOSS: ${stats.lossCount}
        QUANTIDADE DE WINS: ${stats.winsCount}
        QUANTIDADE DE EMPATES: ${stats.drawsCount}
    
        ASSERTIVIDADE: ${stats.accuracy}%
    `
    console.log(colors.table(centerText(horizontalLine("all"),windowInfo.width)));
    console.log(colors.stats(sta));
    console.log(colors.table(centerText(horizontalLine(70),windowInfo.width)));
}

function createStats(statsResult:TStatsResult){
    let stats = {...statsResult};
    let line = horizontalLine(35)
    let space = ''
    let totalProfit = stats.totalProfit.toString();
    let parcialProfit = stats.parcialProfit.toString();

    let winsCount = stats.winsCount.toString();
    let lossCount = stats.lossCount.toString();
    let drawsCount = stats.drawsCount.toString();

    format();
    align();
    colorize();

    let all = [
        line,
        stats.initialBalance,
        totalProfit,
        stats.takeProfit,
        stats.stopLoss,
        space,

        line,
        parcialProfit,
        stats.allResults,
        space,
        
        line,
        lossCount,
        winsCount,
        drawsCount,
        space
    ]

    return all.join('\n');

    function align(){
        line = center(line);
        stats.initialBalance = center(stats.initialBalance),
        totalProfit = center(totalProfit)
        stats.takeProfit = center(stats.takeProfit)
        stats.stopLoss = center(stats.stopLoss)
        space = center(space)

        parcialProfit = center(parcialProfit)
        stats.allResults = center(stats.allResults)
        lossCount = center(lossCount )
        winsCount = center(winsCount)
        drawsCount = center(drawsCount)
    
        stats.accuracy = center(stats.accuracy)
    }

    function center(text:string|number){
        return centerText(text,windowInfo.width);
    }

    function format(){
        stats.initialBalance = `COMO A BANCA ESTAVA ANTES DA OPERAÇÃO: R$ ${stats.initialBalance}`
        totalProfit = `LUCRO TOTAL DESDE A PRIMEIRA OPERAÇÃO: R$ ${stats.totalProfit}`
        parcialProfit = `LUCRO TOTAL EXIBIDO NA TELA: R$ ${stats.parcialProfit}`
        stats.takeProfit = `TAKEPROFIT: R$ ${stats.takeProfit}`
        stats.stopLoss = `STOPLOSS: R$ ${stats.stopLoss}`
        stats.allResults = `QUANTIDADE DE ENTRADAS EXIBIDAS AGORA: ${stats.allResults}`
        lossCount = `QUANTIDADE DE LOSS: ${stats.lossCount}`
        winsCount = `QUANTIDADE DE WINS: ${stats.winsCount}`
        drawsCount = `QUANTIDADE DE EMPATES: ${stats.drawsCount}`
        stats.accuracy = `ASSERTIVIDADE: ${stats.accuracy}%`
    }

    function colorize(){
        totalProfit = (stats.totalProfit>0)
        ?colors.positive(totalProfit)
        :colors.negative(totalProfit)

        parcialProfit = (stats.parcialProfit>0)
        ?colors.positive(parcialProfit)
        :colors.negative(parcialProfit)

        lossCount = colors.negative(lossCount);
        winsCount = colors.positive(winsCount);
        drawsCount = colors.table(drawsCount);

        line = colors.stats(line);
    }
}