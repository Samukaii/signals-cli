export interface IContentInfo {
    getLossValue: () => [{ result: number, lineIndex: number }],
    getAllWinOrLoss: () => [{ result: string, lineIndex: number }],
    getWinValue: () => [{ result: number, lineIndex: number }],
    getEntriesInvested: () => [{ result: number, lineIndex: number }],
    getStopLoss: () => number,
    getTakeProfit: () => number,
    getTimes: () => [{ result: string, lineIndex: number }]
    getGales: () => [{ result: number, lineIndex: number }],
    getInitialBalance: () => number,
    getProfitsReceived: () => [{ result: number, lineIndex: number }],
    getEntryResult: () => [IEntryResult],
    getStats: () => IStats,
}
export interface IStats {
    stopLoss: number,
    takeProfit: number,
    initialBalance: number,
    totalProfit: number,
    allResults: number,
    winsCount: number,
    lossCount: number,
    drawsCount: number,
    accuracy: number
}
export interface IEntryResult {
    result: {
        time: string,
        profitReceived: number,
        winOrLoss: string,
        gale: number
    }, lineIndex: number
}

export interface ISignalsInfo {
    timeframe: string,
    active: string,
    time: string,
    entry: number
}