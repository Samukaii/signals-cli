import { isUndefineds } from "../../helpers";
import { TScrapResult, TNotUndefinedScrapResult, TNotUndefinedEntriesResult, TEntriesResult } from "types";

type TResults = TScrapResult<TEntriesResult>
type TNotUndefinedResult = TNotUndefinedScrapResult<TNotUndefinedEntriesResult>

export function catchNotUndefinedResults<T>(results: TScrapResult<T>[]): TNotUndefinedScrapResult<T>[] {
    let res: TNotUndefinedScrapResult<T>[] = []

    results.map(result => {
        if (typeof result.result== "undefined") return;
        res.push(result as TNotUndefinedScrapResult<T>);
    })

    return res;
}

export function catchNotUndefinedEntryResults(results: TResults[]): TNotUndefinedResult[] {
    let res:TNotUndefinedResult[]= []
    results.map(entryInfo => {
        let time = entryInfo?.result?.time;
        let winLoss = entryInfo?.result?.winOrLoss;
        let profit = entryInfo?.result?.profitReceived;
        let gale = entryInfo?.result?.gale;
        let soFar = entryInfo?.result?.profitReceivedSoFar;

        if (!entryInfo.result) return;
        if (isUndefineds(time, winLoss, soFar, gale, profit)) return

        res.push(entryInfo as TNotUndefinedResult);
    })
    return res;
}