/**@type {import('./scrapper')} */

export function getGale(entry, factor, value){
    const factorMultiple = value/entry;
    const result = Math.log10(factorMultiple)/Math.log10(factor);
    return Math.round(result);
}

export function getBalance(content){
    const regex = /INFO:Saldo: (\w*.?\w*)/;

    let match = content.match(regex);

    return match?.[1];
}


export function getTime(line=""){
    const regex = /(\w{2}:\w{2}:\w{2}) INFO:/;

    
    let match = line.match(regex);

    return match?.[1];
}
export function getTakeProfit(line){
    const regex = /Saldo: \w*.?\w* \| TakeProfit: (\w*.?\w*) \| StopLoss: \w*.?\w*/;
    
    let match = line.match(regex);

    return match?.[1];
}
export function getStopLoss(line){
    const regex = /Saldo: \w*.?\w* \| TakeProfit: \w*.?\w* \| StopLoss: (\w*.?\w*)/;

    let match = line.match(regex);

    return match?.[1];
}
export function getWinOrLoss(line){
    const regex = /Ordem: \w* \| (\w*) \| Valor: \w*.?\w* \| Ganho: \w*/;

    let match = line.match(regex);

    return match?.[1];
}
export function getEntryValue(line){
    const regex = /Ordem: \w* \| \w* \| Valor: (\w*.?\w*) \| Ganho: \w*/;

    let match = line.match(regex);

    return match?.[1];
}
export function getWinValue(line){
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: (\w*.?\w*) \| Perda: -*\w*.?\w*/;

    let match = line.match(regex);

    return match?.[1];
}
export function getLossValue(line){
    const regex = /Ordem: \w* \| \w* \| Valor: \w*.?\w* \| Ganho: \w*.?\w* \| Perda: (-*\w*.?\w*)/;

    let match = line.match(regex);
    
    return match?.[1];
}
export function getEntryProfitValue(line){
    return parseFloat(getWinValue(line)) + parseFloat(getLossValue(line))
}

export default function createScrapping(line){
    return {
        getLossValue: ()=>getLossValue(line),
        getWinOrLoss: ()=>getWinOrLoss(line),
        getWinValue : ()=>getWinValue(line),
        getEntryValue:  ()=>getEntryValue(line),
        getStopLoss : ()=>getStopLoss(line),
        getTakeProfit : ()=>getTakeProfit(line),
        getTime : ()=>getTime(line),
        getGale : (entry, factor, value)=>getGale(entry, factor, value),
        getBalance :()=> getBalance(line),
        getEntryProfitValue: ()=>getEntryProfitValue(line)
    }
}