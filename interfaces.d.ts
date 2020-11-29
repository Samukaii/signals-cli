export interface lineInfo{
    getLossValue: ()=>string,
    getWinOrLoss: ()=>string,
    getWinValue : ()=>string,
    getEntryValue:  ()=>string,
    getStopLoss : ()=>string,
    getTakeProfit : ()=>string,
    getTime : ()=>string,
    getGale : (entry:number, factor:number, value:number)=>number,
    getBalance :()=> string
}
