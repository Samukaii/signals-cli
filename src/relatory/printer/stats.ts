import { TStatsResult } from "types";
import { colors, windowInfo } from "./styles";
import { centerText, horizontalLine } from "./utils";

export function printStats(stats: TStatsResult) {
    const statsText = createStats(stats);
    console.log(colors.table(centerText(horizontalLine("all"),windowInfo.width)));
    console.log(colors.stats(statsText));
    console.log(colors.table(centerText(horizontalLine(70),windowInfo.width)));
}

function createStats(statsResult:TStatsResult){
    let stats = {...statsResult};
    let line = horizontalLine(35)
    let space = ''
    
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
    ]

    return all.join('\n');

    function align(){
        line = center(line);
        stats.initialBalance = center(stats.initialBalance),
        totalProfit = center(totalProfit)
        takeProfit = center(takeProfit)
        stopLoss = center(stopLoss)
        space = center(space)

        parcialProfit = center(parcialProfit)
        allResults = center(allResults)
        lossCount = center(lossCount )
        winsCount = center(winsCount)
        drawsCount = center(drawsCount)
    }

    function center(text:string|number){
        return centerText(text,windowInfo.width);
    }

    function format(){
        stats.initialBalance = `COMO A BANCA ESTAVA ANTES DA OPERAÇÃO: R$ ${stats.initialBalance}`
        totalProfit = `LUCRO TOTAL DESDE A PRIMEIRA OPERAÇÃO: R$ ${stats.totalProfit}`
        parcialProfit = `LUCRO TOTAL EXIBIDO NA TELA: R$ ${stats.parcialProfit}`
        takeProfit = `TAKEPROFIT: R$ ${stats.takeProfit}`
        stopLoss = `STOPLOSS: R$ ${stats.stopLoss}`
        allResults = `QUANTIDADE DE ENTRADAS EXIBIDAS AGORA: ${stats.allResults}`
        lossCount = `QUANTIDADE DE LOSS: ${stats.lossCount}`
        winsCount = `QUANTIDADE DE WINS: ${stats.winsCount}`
        drawsCount = `QUANTIDADE DE EMPATES: ${stats.drawsCount}`
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