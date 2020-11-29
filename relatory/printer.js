/**@type {import('./printer')} */
import chalk from 'chalk';
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


export function printStats(profit, balance, stopLoss, takeProfit) {
    profit = parseFloat(profit).toPrecision(4);
    parcialProfit = parcialProfit.toPrecision(4);
    let accuracy = ((wins / (draws + wins + loss)) * 100).toPrecision(4);

    const stats = `${`=`.repeat(55)}
    COMO A BANCA ESTAVA ANTES DA OPERAÇÃO: ${style.balance('R$ ' + balance)}
    LUCRO TOTAL DESDE A PRIMEIRA OPERAÇÃO: ${(profit < 0)
            ? style.profitNegative('R$ ' + profit)
            : style.profitPositive('R$ ' + profit)
        }
    LUCRO TOTAL EXIBIDO NA TELA: ${(parcialProfit < 0)
            ? style.parcialProfitNegative('R$ ' + parcialProfit)
            : style.parcialProfitPositive('R$ ' + parcialProfit)
        }

        TAKEPROFIT: ${takeProfit}
        STOPLOSS: ${stopLoss}

        QUANTIDADE DE ENTRADAS EXIBIDAS AGORA: ${entries}
        QUANTIDADE DE LOSS: ${loss}
        QUANTIDADE DE WINS: ${wins}
        QUANTIDADE DE EMPATES: ${draws}
    
        ASSERTIVIDADE: ${accuracy}
    `

    console.log(chalk.greenBright(centerText(stats, 50)));
}

function centerText(text, padding) {
    let parts = text.split('\n')

    parts = parts.map(s => s
        .padStart(s.length + Math.floor((padding - s.length) / 2), ' ')
        .padEnd(padding, ' ')
    );

    return parts.join('\n');
}

export function printResults(lineInfo, options) {
    all(lineInfo, options);

}

function shouldContinue(lineInfo, options) {
    let gale = lineInfo.getGale(3, 2.4, lineInfo.getEntryValue())
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


export function all(lineInfo, options) {
    if (!lineInfo.getTime() | !lineInfo.getWinOrLoss() | !lineInfo.getEntryValue()) return
    if (isDraw()) draws++;
    else if (isWin()) wins++;
    else loss++;
    if (!shouldContinue(lineInfo, options)) return;
    entries++;
    let winOrLoss = convertText(lineInfo.getWinOrLoss());
    let winOrLossText = centerText(winOrLoss);
    winOrLossText = colorizeText(winOrLossText);

    let gale = lineInfo.getGale(3, 2.4, lineInfo.getEntryValue());
    let galeText = convertGaleText(winOrLoss, gale);
    galeText = leftText(galeText, 17);
    galeText = colorizeText(galeText);

    let timeText = chalk.hex('#AE81FF')(lineInfo.getTime())
    let entryProfitValueText = colorizeText(centerText(lineInfo.getEntryProfitValue().toString()));


    console.log(chalk.bold.magentaBright(`[${timeText}] ${winOrLossText} | ${entryProfitValueText} | ${galeText} |`))
    chalk.reset();

    parcialProfit += parseFloat(lineInfo.getWinValue()) + parseFloat(lineInfo.getLossValue());
    function isWin() {
        return lineInfo.getWinOrLoss() == "WIN";
    }
    function isDraw() {
        return lineInfo.getWinOrLoss() == "EQUAL";
    }
    function centerText(text = "", padding = 10) {
        let max = padding;

        return text
            .padStart(text.length + Math.floor((max - text.length) / 2), ' ')
            .padEnd(max, ' ')
    }
    function leftText(text = "", padding = 10) {
        return text.padEnd(padding)
    }
    function convertText(text) {
        if (text == "EQUAL") return `EMPATE`;
        return text;
    }

    function convertGaleText(winOrLossText, gale) {
        let galeText;

        (gale == 0)
            ? galeText = `${winOrLossText} SEM GALE`
            : galeText = `${winOrLossText} NO ${gale}° GALE`

        return galeText;
    }
    function colorizeText(text) {
        if (isDraw()) return chalk.hex('#1762E8')(text);
        if (isWin()) return chalk.greenBright(text);
        else return chalk.redBright(text);
    }
}