/**@type {import('./extractor')} */

import chalk from 'chalk';

export function getGales(entry, factor, value) {
    const factorMultiple = value / entry;
    const result = Math.log10(factorMultiple) / Math.log10(factor);
    return Math.round(result);
}

export function getBalance(content) {
    const regex = /INFO:Saldo: (\w*.?\w*)/;
    scrapp(content, regex);
}

function scrapp(content, regex) {
    let match = content.match(regex);

    return match?.[1];
}


export function getTimes(lines = [""]) {
    const regex = /(\w{2}:\w{2}:\w{2}) INFO:/;

    return scrappContent(lines, regex);
}

function scrappContent(lines, regex) {
    let results = []
    lines.map((line, index) => {
        let result = scrapp(line, regex);
        if (!result) return;
        results.push(
            {
                result: result,
                lineIndex: index
            })
    })

    return results
}
export function getTakeProfit(line) {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: (\w*.?\w*) \| StopLoss: \w*.?\w*/;

    let match = line.match(regex);

    return match?.[1];
}
export function getStopLoss(line) {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: \w*.?\w* \| StopLoss: (\w*.?\w*)/;

    let match = line.match(regex);

    return match?.[1];
}
export function getAllWinOrLoss(lines) {
    const regex = /Ordem: \w* \| (\w*) \| Valor: \w*.?\w* \| Ganho: \w*/;

    let times = []
    lines.map((line, index) => {
        let result = scrapp(line, regex)
        if (!result) return
        times.push(
            {
                result,
                lineIndex: index
            })
    })

    return times
}
export function getEntryValue(line) {
    const regex = /Ordem: \w* \| \w* \| Valor: (\w*.?\w*) \| Ganho: \w*/;

    let match = line.match(regex);

    return match?.[1];
}
export function getWinValue(lines) {
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: (\w*.?\w*) \| Perda: -*\w*.?\w*/;

    let winValues = []
    lines.map((line, index) => {
        let result = scrapp(line, regex)
        if (!result) return
        winValues.push(
            {
                result,
                lineIndex: index
            })
    })

    return winValues
}
export function getLossValue(lines) {
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: \w*.?\w* \| Perda: (-*\w*.?\w*)/;

    let lossValues = []
    lines.map((line, index) => {
        let result = scrapp(line, regex)
        if (!result) return
        lossValues.push(
            {
                result,
                lineIndex: index
            })
    })

    return lossValues
}
export function getEntriesProfitValue(lines) {
    let winValues = getWinValue(lines);
    let lossValues = getLossValue(lines);
    let entriesProfitValues = [];

    for (let index = 0; index < lines.length; index++) {
        let win = winValues[index]
        let loss = lossValues[index];

        if (!haveWinAndLoss()) continue;

        if (!isWinAndLossInTheSameLine()) { error(); continue; }
        let floatWin = parseFloat(win.result);
        let floatloss = parseFloat(loss.result);
        let result = floatWin + floatloss;

        entriesProfitValues.push({ result, lineIndex: index })

        function error() { console.log(chalk.redBright("ERROR!")) }

        function haveWinAndLoss() {
            return loss && win
        }
        function isWinAndLossInTheSameLine() {
            return loss.lineIndex == win.lineIndex
        }
    }

    return entriesProfitValues;
}


export default function createExtractor(content = "") {
    const removeSpaces = (fileContent) => fileContent.trim();
    const putFileLinesInArray = (fileContent) => fileContent.split(/\r?\n/);

    let lines = putFileLinesInArray(removeSpaces(content));

    return {
        getLossValue: () => getLossValue(lines),
        getAllWinOrLoss: () => getAllWinOrLoss(lines),
        getWinValue: () => getWinValue(lines),
        getEntryValue: () => getEntryValue(lines),
        getStopLoss: () => getStopLoss(lines),
        getTakeProfit: () => getTakeProfit(lines),
        getTimes: () => getTimes(lines),
        getGales: (entry, factor, value) => getGales(entry, factor, value),
        getBalance: () => getBalance(content),
        getEntriesProfitValue: () => getEntriesProfitValue(lines)
    }
}