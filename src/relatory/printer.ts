/**@type {import('./printer')} */
import chalk from 'chalk';
import { IEntryResult, IStats } from '../interfaces';
let entries = 0;
let wins = 0, loss = 0, draws = 0;
let parcialProfit = 0;

const style = {
    initialLine: chalk.blueBright,
    backGround: chalk.greenBright,
    balance: chalk.bold,
    profitNegative: chalk.yellowBright.bold.bgRedBright,
    profitPositive: chalk.whiteBright.bold.bgHex('067552'),
    parcialProfitNegative: chalk.yellow.bold.bgRedBright,
    parcialProfitPositive: chalk.whiteBright.bold.bgHex('067552'),

}


export function printStats(stats: IStats) {
    //profit = parseFloat(profit).toPrecision(4);
    //parcialProfit = parcialProfit.toPrecision(4);
    //let accuracy = ((wins / (draws + wins + loss)) * 100).toPrecision(4);

    const statsText = `${chalk.blueBright(`=`.repeat(55))}
    COMO A BANCA ESTAVA ANTES DA OPERAÇÃO: ${style.balance('R$ ' + stats.initialBalance)}
    LUCRO TOTAL DESDE A PRIMEIRA OPERAÇÃO: ${(stats.totalProfit < 0)
            ? style.profitNegative('R$ ' + stats.totalProfit)
            : style.profitPositive('R$ ' + stats.totalProfit)
        }
    LUCRO TOTAL EXIBIDO NA TELA: ${(1 < 0)
            ? style.parcialProfitNegative('R$ ' + 'parcialProfit')
            : style.parcialProfitPositive('R$ ' + 'parcialProfit')
        }

        TAKEPROFIT: ${stats.takeProfit}
        STOPLOSS: ${stats.stopLoss}

        QUANTIDADE DE ENTRADAS EXIBIDAS AGORA: ${stats.allResults}
        QUANTIDADE DE LOSS: ${stats.lossCount}
        QUANTIDADE DE WINS: ${stats.winsCount}
        QUANTIDADE DE EMPATES: ${stats.drawsCount}
    
        ASSERTIVIDADE: ${stats.accuracy}%
    `

    console.log(chalk.greenBright(centerText(statsText, 50)));
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


export function all(entrieResults: [IEntryResult], stats: IStats) {
    entrieResults.map((result) => {
        let gale = result.result.gale;
        let timeText = centerText(`[${result.result.time}]`, 10);
        let profitReceivedText = centerText(result.result.profitReceived, 25);
        let winOrLossText = leftText(`${result.result.winOrLoss} NO ${gale} GALE`, 15);
        console.log(`${timeText} ${profitReceivedText} | ${winOrLossText}`);
    })
    printStats(stats);


    // if (!lineInfo.getTime() | !lineInfo.getWinOrLoss() | !lineInfo.getEntryValue()) return
    // if (isDraw()) draws++;
    // else if (isWin()) wins++;
    // else loss++;
    // if (!shouldContinue(lineInfo, options)) return;
    // entries++;
    // let winOrLoss = convertText(lineInfo.getWinOrLoss());
    // let winOrLossText = centerText(winOrLoss);
    // winOrLossText = colorizeText(winOrLossText);

    // let gale = lineInfo.getGale(5, 2.3, lineInfo.getEntryValue());
    // let galeText = convertGaleText(winOrLoss, gale);
    // galeText = leftText(galeText, 17);
    // galeText = colorizeText(galeText);

    // let timeText = chalk.hex('#AE81FF')(lineInfo.getTime())
    // let entryProfitValueText = colorizeText(centerText(lineInfo.getEntryProfitValue().toString()));


    // console.log(chalk.bold.magentaBright(`[${timeText}] ${winOrLossText} | ${entryProfitValueText} | ${galeText} |`))
    // chalk.reset();

    // parcialProfit += parseFloat(lineInfo.getWinValue()) + parseFloat(lineInfo.getLossValue());
    // function isWin() {
    //     return lineInfo.getWinOrLoss() == "WIN";
    // }
    // function isDraw() {
    //     return lineInfo.getWinOrLoss() == "EQUAL";
    // }
    // function centerText(text = "", padding = 10) {
    //     let max = padding;

    //     return text
    //         .padStart(text.length + Math.floor((max - text.length) / 2), ' ')
    //         .padEnd(max, ' ')
    // }
    // function leftText(text = "", padding = 10) {
    //     return text.padEnd(padding)
    // }
    // function convertText(text) {
    //     if (text == "EQUAL") return `EMPATE`;
    //     return text;
    // }

    // function convertGaleText(winOrLossText, gale) {
    //     let galeText;

    //     (gale == 0)
    //         ? galeText = `${winOrLossText} SEM GALE`
    //         : galeText = `${winOrLossText} NO ${gale}° GALE`

    //     return galeText;
    // }
    // function colorizeText(text) {
    //     if (isDraw()) return chalk.hex('#1762E8')(text);
    //     if (isWin()) return chalk.greenBright(text);
    //     else return chalk.redBright(text);
    // }
}