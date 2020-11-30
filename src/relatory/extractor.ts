/**@type {import('./extractor')} */
import scriptConfig from '../config/scriptconfig.json';

interface INumberScrapResult {
    result: number,
    lineIndex: number
}
interface IStringScrapResult {
    result: string,
    lineIndex: number
}
interface ITestScrapResult {
    result: {
        time: string,
        profitReceived: number,
        winOrLoss: string,
        gale: number
    },
    lineIndex: number
}


function getGales(lines: string[]): [INumberScrapResult] {
    let initialEntry = scriptConfig.initial_entry
    let galefactor = scriptConfig.gale_factor;
    let entriesValues = getEntriesInvested(lines)

    let gales: [INumberScrapResult] = [{ result: 0, lineIndex: 0 }];

    entriesValues.map((entryValue, index) => {
        const factorMultiple = entryValue.result / initialEntry;

        const result = Math.log10(factorMultiple) / Math.log10(galefactor);
        gales.push({ result: Math.round(result), lineIndex: index });
    })
    return gales
}

function getStopLoss(content: string): number {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: \w*.?\w* \| StopLoss: (\w*.?\w*)/;
    let stopLossHistory = catchNotUndefinedResults(scrappContent(content, regex));
    return getLast().result;

    function getLast() {
        return stopLossHistory[stopLossHistory.length - 1];
    }
}

function getEntryResult(lines: string[]) {
    let times = getTimes(lines)
    let winOrLoss = getAllWinOrLoss(lines);
    let profitsReceived = getProfitsReceived(lines);
    let gales = getGales(lines);

    let results: [ITestScrapResult] | any[] = []

    lines.map((line, index: number) => {
        let time = times[index]
        let profitReceived = profitsReceived[index]
        let winLoss = winOrLoss[index]
        let gale = gales[index]


        results.push(
            {
                result: {
                    time: time?.result,
                    profitReceived: profitReceived?.result,
                    winOrLoss: winLoss?.result,
                    gale: gale?.result
                },
                lineIndex: index
            }
        )

    })
    return results;
}

function getInitialBalance(content: string) {
    const regex = /INFO:Saldo: (\w*.?\w*)/;
    return scrapp(content, regex);
}


function scrapp(content: string, regex: RegExp) {
    let match = content.match(regex);

    return match?.[1];
}


function getTimes(lines: string[]): [{ result: string | undefined, lineIndex: number }] {
    const regex = /\w{4}-\w{2}-\w{2} (\w{2}:\w{2}:\w{2})/;

    return scrappContent(lines, regex);
}

function scrappContent(lines: string[], regex: RegExp): [{ result: string | undefined, lineIndex: number }] {
    let results: [{ result: string | undefined, lineIndex: number }] = [{ result: "", lineIndex: 0 }]
    lines.map((line, index) => {
        let result = scrapp(line, regex);
        results.push(
            {
                result: scrapp(line, regex),
                lineIndex: index
            })
    })

    return results
}
function getTakeProfit(lines: string[]) {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: (\w*.?\w*) \| StopLoss: \w*.?\w*/;

    let takeProfitHistory = catchNotUndefinedResults(scrappContent(lines, regex));
    return getLast().result;

    function getLast() {
        return takeProfitHistory[takeProfitHistory.length - 1];
    }
}

function getAllWinOrLoss(lines) {
    const regex = /Ordem: \w* \| (\w*) \| Valor: \w*.?\w* \| Ganho: \w*/;

    let times = []
    lines.map((line, index) => {
        times.push(
            {
                result: scrapp(line, regex),
                lineIndex: index
            })
    })

    return times
}
function getEntriesInvested(lines) {
    const regex = /Ordem: \w* \| \w* \| Valor: (\w*.?\w*) \| Ganho: \w*/;

    let results = scrappContent(lines, regex);

    results.forEach(result => {
        result.result = parseFloat(result.result);
    })

    return results
}
function getWinValue(lines) {
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: (\w*.?\w*) \| Perda: -*\w*.?\w*/;

    let winValues = scrappContent(lines, regex);
    winValues.map(winValue => {
        if (winValue)
            winValues.result = parseFloat(winValues.result)
    })
    return winValues
}
function getLossValue(lines) {
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: \w*.?\w* \| Perda: (-*\w*.?\w*)/;

    let lossValues = scrappContent(lines, regex);
    lossValues.map(lossValue => {
        if (lossValue)
            lossValue.result = parseFloat(lossValue.result);
    })

    return lossValues
}
function getProfitsReceived(lines) {
    let winValues = getWinValue(lines);
    let lossValues = getLossValue(lines);
    let profitsReceived = [];

    for (let index = 0; index < lines.length; index++) {
        let win = winValues[index]
        let loss = lossValues[index];

        let result = parseFloat(win?.result) + parseFloat(loss?.result);

        profitsReceived.push({ result, lineIndex: index })
    }

    return profitsReceived;
}

function catchNotUndefinedResults(results) {
    let res = []
    results.map(result => {
        if (!result.result) return;
        res.push(result);
    })
    return res;
}
function catchNotUndefinedEntryResults(results) {
    let res = []
    results.map(result => {
        let time = result.result.time;
        let winLoss = result.result.winOrLoss;
        let profit = result.result.profitReceived;

        if (!result.result) return;
        if (!hasAllNeededInfo()) return
        res.push(result);

        function hasAllNeededInfo() {
            return time && winLoss && profit;
        }
    })
    return res;
}

function getTotalProfit(lines) {
    return catchNotUndefinedResults(getProfitsReceived(lines)).reduce((acumulador, valor) => {
        return acumulador += valor?.result;
    }, 0).toPrecision(4)
}

function getWinsCount(lines) {
    return catchNotUndefinedResults(getAllWinOrLoss(lines)).reduce((acumulador, valor) => {
        if (valor?.result == "WIN")
            return acumulador += 1;
        return acumulador += 0;
    }, 0)
}

function getLossCount(lines) {
    return catchNotUndefinedResults(getAllWinOrLoss(lines)).reduce((acumulador, valor) => {
        if (valor?.result == "LOSS")
            return acumulador += 1;
        return acumulador += 0;
    }, 0)
}



function getDrawsCount(lines) {
    return catchNotUndefinedResults(getAllWinOrLoss(lines)).reduce((acumulador, valor) => {
        if (valor?.result == "EQUAL")
            return acumulador += 1;
        return acumulador += 0;
    }, 0)
}

function getAccuracy(lines) {
    let total = catchNotUndefinedEntryResults(getEntryResult(lines)).length;
    let accuracy = (getWinsCount(lines) / total) * 100;
    return accuracy.toPrecision(4);
}


function getStats(lines, content) {
    return {
        stopLoss: parseFloat(getStopLoss(lines)),
        takeProfit: parseFloat(getTakeProfit(lines)),
        initialBalance: parseFloat(getInitialBalance(content)),
        totalProfit: parseFloat(getTotalProfit(lines)),
        allResults: catchNotUndefinedEntryResults(getEntryResult(lines)).length,
        winsCount: getWinsCount(lines),
        lossCount: getLossCount(lines),
        drawsCount: getDrawsCount(lines),
        accuracy: parseFloat(getAccuracy(lines))
    }
}

export default function createExtractor(content: string) {
    const removeSpaces = (fileContent: string) => fileContent.trim();
    const putFileLinesInArray = (fileContent: string) => fileContent.split(/\r?\n/);

    let lines: string[] = putFileLinesInArray(removeSpaces(content));

    return {
        getLossValue: () => catchNotUndefinedResults(getLossValue(lines)),
        getAllWinOrLoss: () => catchNotUndefinedResults(getAllWinOrLoss(lines)),
        getWinValue: () => catchNotUndefinedResults(getWinValue(lines)),
        getEntriesInvested: () => getEntriesInvested(lines),
        getStopLoss: () => getStopLoss(lines),
        getTakeProfit: () => getTakeProfit(lines),
        getTimes: () => getTimes(lines),
        getGales: () => catchNotUndefinedResults(getGales(lines)),
        getInitialBalance: () => getInitialBalance(content),
        getProfitsReceived: () => catchNotUndefinedResults(getProfitsReceived(lines)),
        getEntryResult: () => catchNotUndefinedEntryResults(getEntryResult(lines)),
        getStats: () => getStats(lines, content),
        getStopLoss: () => getStopLoss(lines)
    }
}