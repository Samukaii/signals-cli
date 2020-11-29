export interface contentInfo {
    getLossValue: () => string,
    getAllWinOrLoss: (lines: [string]) => [{ result: string, lineIndex: number }],
    getWinValue: () => string,
    getEntryValue: () => string,
    getStopLoss: () => string,
    getTakeProfit: () => string,
    getTimes: (lines: [string]) => [{ result: string, lineIndex: number }]
    getGales: (entry: number, factor: number, value: number) => number,
    getBalance: () => string,
    getEntriesProfitValue: () => (lines: [string]) => [{ result: number, lineIndex: number }],
}
