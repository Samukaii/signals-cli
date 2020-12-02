/**@type {import('./printer')} */
import chalk from 'chalk';
import { TStatsResult,TScrapResult, TEntriesResult } from 'types';

type TEntriesResultScrap = TScrapResult<TEntriesResult>

const style = {
    initialLine: chalk.blueBright,
    backGround: chalk.greenBright,
    balance: chalk.bold,
    profitNegative: chalk.yellowBright.bold.bgRedBright,
    profitPositive: chalk.whiteBright.bold.bgHex('067552'),
    parcialProfitNegative: chalk.yellow.bold.bgRedBright,
    parcialProfitPositive: chalk.whiteBright.bold.bgHex('067552'),

}


function centerText(text: string, padding: number) {
    text = text.toString();
    let parts = text.split('\n')

    parts = parts.map(s => s
        .padStart(s.length + Math.floor((padding - s.length) / 2), ' ')
        .padEnd(padding, ' ')
    );

    return parts.join('\n');
}

function leftText(text = "", padding = 10) {
    text = text.toString();
    let parts = text.split('\n')

    parts = parts.map(s => s.padEnd(padding, ' '));

    return parts.join('\n');
}

export function printResults(entryResults: IEntryResult, stats: IStats) {
    all(entryResults, stats);

}

function shouldContinue(lineInfo, options) {
    let gale = lineInfo.getGale(5, 2.3, lineInfo.getEntryValue())
    let filter = [];
    if (options.hasOwnProperty('show')) {
        if (isDraw()) filter.push(false);

        if (options.show?.toLowerCase() == "wins") {
            if (isWin()) {
                filter.push(true)
            }
            else {
                filter.push(false)
            }
        }

        else {
            if (!isWin()) {
                filter.push(true)
            }
            else {
                filter.push(false)
            }
        }
    }
    if (options.hasOwnProperty('gales')) {
        if (gale == options.gales) { filter.push(true) }
        else {
            filter.push(false)
        }
    }

    const result = filter.every(function (option) {
        return option === true
    })
    return result;

    function isWin() {
        return lineInfo.getWinOrLoss() == "WIN";
    }
    function isDraw() {
        return lineInfo.getWinOrLoss() == "EQUAL";
    }
}

const windowInfo = {
    width:process.stdout.columns
}


const resultStyle = {
    time:{
        padding: percentOfWindow(5.5)
    },
    profitReceived:{
        padding: percentOfWindow(25)
    },
    winOrLoss:{
        padding: percentOfWindow(25)
    },
    profitSoFar:{
        padding: percentOfWindow(25)
    }
}

function percentOfWindow(percent:number){
    return (percent/100)*windowInfo.width
}

export function all(entrieResults:TEntriesResultScrap[], stats: TStatsResult) {
    printHeader();
    printEachResult(entrieResults);
    printStats(stats);
}

function printEachResult(entrieResults:TEntriesResultScrap[]){
    entrieResults.map((result) => {
        let gale = result.result.gale;
        let timeText = leftText(`[${result.result.time}]`, resultStyle.time.padding);
        let profitReceivedText = centerText(`R$ ${leftText(result.result.profitReceived,9)}`, resultStyle.profitReceived.padding) ;
        let winOrLossText = leftText(`${result.result.winOrLoss.toUpperCase()} NO ${gale} GALE`, resultStyle.winOrLoss.padding);
        let profitSoFar = centerText(`R$ ${result.result.soFar}`, resultStyle.winOrLoss.padding);
        console.log(`${timeText} ${profitReceivedText} | ${winOrLossText} | ${profitSoFar}`);
    })
}

function printHeader(){
    const timeText = `${centerText('HORA',resultStyle.time.padding)}`;
    const profitReceivedText = `${centerText('LUCRO',resultStyle.profitReceived.padding)}`;
    const winOrLossText = `${centerText('RESULTADO',resultStyle.winOrLoss.padding)}`;
    const profitSoFarText = `${centerText('SALDO',resultStyle.profitSoFar.padding)}`;
    console.log(`${timeText}| ${profitReceivedText} | ${winOrLossText} | ${profitSoFarText}`);
    console.log('='.repeat(windowInfo.width));
}

export function printStats(stats: TStatsResult) {
    const statsText = `${`=`.repeat(windowInfo.width)}
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

    console.log(centerText(statsText, windowInfo.width));
}