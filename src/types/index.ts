export type TScrapResult<T> = {
    result: T | undefined,
    lineIndex: number
}
export type TNotUndefinedScrapResult<T> = {
    result: T,
    lineIndex: number
}

export type TEntriesResult = {
    time: string | undefined,
    profitReceived: number | undefined,
    winOrLoss: string | undefined,
    gale: number | undefined,
    profitReceivedSoFar:number
}
export type TNotUndefinedEntriesResult = {
    time: string,
    profitReceived: number,
    winOrLoss: string,
    gale: number,
    profitReceivedSoFar:number
}
export type TStatsResult = {
    stopLoss: number,
    takeProfit: number,
    initialBalance: string,
    totalProfit: number,
    parcialProfit: number,
    allResults: number,
    winsCount: number,
    lossCount: number,
    drawsCount: number,
    accuracy: string
}

export type TUnionArray<T, U> = (T | U)[]