import { TEntriesResult, TNotUndefinedEntriesResult, TNotUndefinedScrapResult, TScrapResult } from "types";
import scriptConfig from '../../config/scriptconfig.json'
import { scrappLine } from "./scrapper";
import { catchNotUndefinedEntryResults } from "./utils";

type TNotUndefinedResult = TNotUndefinedScrapResult<TNotUndefinedEntriesResult>
type TResults = TScrapResult<TEntriesResult>

function getWinValue(line: string) {
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: (\w*.?\w*) \| Perda: -*\w*.?\w*/;

    let winValues:string|undefined|number = scrappLine(line, regex);

    if(typeof winValues!=="undefined")
        winValues = parseFloat(winValues);
    return winValues;
}
function getLossValue(line: string) {
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: \w*.?\w* \| Perda: (-*\w*.?\w*)/;

    let lossValues:string|undefined|number = scrappLine(line, regex);

    if(typeof lossValues!=="undefined")
        lossValues = parseFloat(lossValues);
    return lossValues;
}

function getEntriesInvested(line: string){
    const regex = /Ordem: \w* \| \w* \| Valor: (\w*.?\w*) \| Ganho: \w*/;

    let result:number|string|undefined = scrappLine(line, regex);
    if(typeof result !=="undefined")
        result = parseFloat(result);

    return result
}

function getGales(line: string) {
    let initialEntry = scriptConfig.initial_entry
    let galefactor = scriptConfig.gale_factor;

    let entriesValues = getEntriesInvested(line)
    let gales;
    if(typeof entriesValues!=="undefined"){
        const factorMultiple = entriesValues / initialEntry;
        gales = Math.log10(factorMultiple) / Math.log10(galefactor);
        gales = Math.round(gales)
    }

    return gales
}

function getTimes(line: string): string|undefined {
    const regex = /\w{4}-\w{2}-\w{2} (\w{2}:\w{2}:\w{2})/;

    return scrappLine(line, regex);
}
function getProfitReceived(line: string) {
    let winValues = getWinValue(line);
    let lossValues = getLossValue(line);
    let profitReceived;

    if (typeof lossValues !=="undefined" && typeof winValues !=="undefined")
        profitReceived = winValues + lossValues;

    return profitReceived;
}
function getAllWinOrLoss(line: string) {
    const regex = /Ordem: \w* \| (\w*) \| Valor: \w*.?\w* \| Ganho: \w*/;

    let allWinLoss = scrappLine(line, regex);

    return allWinLoss
}

export function getEntryResult(lines: string[]):TNotUndefinedResult[] {
    let results: TResults[] = []
    let soFar = 0;

    lines.map((line, index: number) => {
        let time = getTimes(line);
        let profitReceived = getProfitReceived(line);
        if(profitReceived)
        soFar+=profitReceived;
        let winLoss = getAllWinOrLoss(line);
        let gale = getGales(line)

        results.push(
            {
                result: {
                    time: time,
                    profitReceived: profitReceived,
                    winOrLoss: winLoss,
                    gale,
                    profitReceivedSoFar: soFar
                },
                lineIndex: index
            }
        )

    })

    return catchNotUndefinedEntryResults(results);
}
