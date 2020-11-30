/**@type {import('./extractor')} */
import scriptConfig from '../scriptconfig.json';

function getGales(lines) {
    let initialEntry = scriptConfig.initial_entry
    let galefactor = scriptConfig.gale_factor;
    let entriesValues = getEntriesInvested(lines)

    let gales = [];

    entriesValues.map((entryValue, index) => {
        const factorMultiple = entryValue.result / initialEntry;

        const result = Math.log10(factorMultiple) / Math.log10(galefactor);
        gales.push({ result: Math.round(result), lineIndex: index });
    })
    return gales
}

function getStopLoss(content) {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: \w*.?\w* \| StopLoss: (\w*.?\w*)/;
    let stopLossHistory = catchNotUndefinedResults(scrappContent(content, regex));
    return getLast().result;

    function getLast() {
        return stopLossHistory[stopLossHistory.length - 1];
    }
}

function getEntryResult(lines) {
    let times = getTimes(lines)
    let winOrLoss = getAllWinOrLoss(lines);
    let profitsReceived = getProfitsReceived(lines);
    let gales = getGales(lines);

    let results = []
    lines.map((line, index) => {
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

function getInitialBalance(content) {
    const regex = /INFO:Saldo: (\w*.?\w*)/;
    return scrapp(content, regex);
}


function scrapp(content, regex) {
    let match = content.match(regex);

    return match?.[1];
}


function getTimes(lines = [""]) {
    const regex = /\w{4}-\w{2}-\w{2} (\w{2}:\w{2}:\w{2})/;

    return scrappContent(lines, regex);
}

function scrappContent(lines, regex) {
    let results = []
    lines.map((line, index) => {
        let result = scrapp(line, regex);
        results.push(
            {
                result: result,
                lineIndex: index
            })
    })

    return results
}
function getTakeProfit(content) {
    const regex = /Saldo: \w*.?\w* \| TakeProfit: (\w*.?\w*) \| StopLoss: \w*.?\w*/;

    let takeProfitHistory = catchNotUndefinedResults(scrappContent(content, regex));
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

export default function createExtractor(content = "") {
    const removeSpaces = (fileContent) => fileContent.trim();
    const putFileLinesInArray = (fileContent) => fileContent.split(/\r?\n/);

    let lines = putFileLinesInArray(removeSpaces(content));

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