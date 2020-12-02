import { TStatsResult } from 'types';
import { filterEntries } from '../filter';
import { getEntryResult } from './entriesResult';
import { scrappLine, scrappContentAndConvertToNumber } from './scrapper';
import { catchNotUndefinedEntryResults, catchNotUndefinedResults } from './utils';

function getWinsCount(lines: string[]) {
    return catchNotUndefinedResults(getEntryResult(lines)).reduce((acumulador, valor) => {
        let winOrLoss = valor.result.winOrLoss;
        if (winOrLoss == "win")
            return acumulador += 1;

        return acumulador;
    }, 0)
}

function getLossCount(lines: string[]) {
    return catchNotUndefinedResults(getEntryResult(lines)).reduce((acumulador, valor) => {
        let winOrLoss = valor.result.winOrLoss;
        if (winOrLoss == "loss")
            return acumulador += 1;
        return acumulador += 0;
    }, 0)
}



function getDrawsCount(lines: string[]) {
    return catchNotUndefinedResults(getEntryResult(lines)).reduce((acumulador, valor) => {
        let winOrLoss = valor.result.winOrLoss;
        if (winOrLoss == "equal")
            return acumulador += 1;
        return acumulador += 0;
    }, 0)
}

function getAccuracy(lines: string[]) {
    let total = catchNotUndefinedEntryResults(getEntryResult(lines)).length;
    let accuracy = (getWinsCount(lines) / total) * 100;
    return accuracy.toPrecision(4);
}
function getTotalProfit(lines: string[]) {
    return catchNotUndefinedResults(getEntryResult(lines)).reduce((acumulador, valor) => {
        let totalProfit = valor.result.profitReceived;

        if (totalProfit)
            return acumulador += totalProfit;
        return acumulador += 0;
    }, 0).toFixed(2)
}
function getParcialProfit(lines: string[]) {
    let filtered = filterEntries(catchNotUndefinedResults(getEntryResult(lines)))
    return catchNotUndefinedResults(filtered).reduce((acumulador, valor) => {
        let totalProfit = valor.result.profitReceived;

        if (totalProfit)
            return acumulador += totalProfit;
        return acumulador += 0;
    }, 0).toFixed(2)
}
function getInitialBalance(content: string) {
    const regex = /INFO:Saldo: (\w*.?\w*)/;
    const result =scrappLine(content, regex);
    if(typeof result==="undefined")return ""
    return result;
}

function getStopLoss(content: string[]): number {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: \w*.?\w* \| StopLoss: (\w*.?\w*)/;
    let stopLossHistory = catchNotUndefinedResults(scrappContentAndConvertToNumber(content, regex));
    return getLast().result;

    function getLast() {
        return stopLossHistory[stopLossHistory.length - 1];
    }
}

function getTakeProfit(lines: string[]): number {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: (\w*.?\w*) \| StopLoss: \w*.?\w*/;

    let takeProfitHistory = catchNotUndefinedResults(scrappContentAndConvertToNumber(lines, regex));
    return getLast().result;

    function getLast() {
        return takeProfitHistory[takeProfitHistory.length - 1];
    }
}

export function getStats(lines: string[], content: string):TStatsResult {
    return {
        stopLoss: getStopLoss(lines),
        takeProfit: getTakeProfit(lines),
        initialBalance: getInitialBalance(content),
        totalProfit: parseFloat(getTotalProfit(lines)),
        parcialProfit: parseFloat(getParcialProfit(lines)),
        allResults: catchNotUndefinedEntryResults(getEntryResult(lines)).length,
        winsCount: getWinsCount(lines),
        lossCount: getLossCount(lines),
        drawsCount: getDrawsCount(lines),
        accuracy: getAccuracy(lines)
    }
}
