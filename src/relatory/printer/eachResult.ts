import chalk from "chalk";
import { isNegative } from "../../helpers";
import { TNotUndefinedScrapResult, TNotUndefinedEntriesResult } from "types";
import { colors, paddings } from "./styles";
import { leftText, centerText } from "./utils";

type TEntriesResultScrap = TNotUndefinedScrapResult<TNotUndefinedEntriesResult>


export function printEachResult(entrieResults:TEntriesResultScrap[]){
    entrieResults.map((result) => {
        const entrieResult = createEntrieResult(result)
        console.log(colors.table(entrieResult));
    })
}

function createEntrieResult(result:TEntriesResultScrap){
    let gales = result.result.gale
    let winOrLoss = result.result.winOrLoss
    let profit = result.result.profitReceived
    let profitSoFar:number = result.result.profitReceivedSoFar

    let time = result.result.time
    let profitText:string = profit.toString();
    let profitSoFarText:string = profitSoFar.toString()
    let winLossResult = `${winOrLoss} NO ${gales} GALE`

    format();
    alignInternal();
    alignExternal();
    colorize();

    const all = [
        time,
        profitText,
        winLossResult,
        profitSoFarText
    ]

    return all.join('|');

    function alignInternal(){
        profitText = leftText(profitText,10);
        winLossResult = leftText(winLossResult,17) 
        profitSoFarText = leftText(profitSoFarText, 10)
    }
    function alignExternal(){
        time = centerText(time, paddings.time)
        profitText = centerText(profitText,paddings.profitReceived);
        winLossResult = centerText(winLossResult,paddings.winOrLoss) 
        profitSoFarText = centerText(profitSoFarText, paddings.profitSoFar)
    }

    function format(){
        profitText = `R$ ${profit.toFixed(2)}`
        profitSoFarText = `R$ ${profitSoFar.toFixed(2)}`
        time = `[${time}]`

        winLossResult = (noGale(gales))
        ?`${winOrLoss} SEM GALE`
        :`${winOrLoss} NO ${gales}° GALE`
    }

    function colorize(){
        time = chalk.magentaBright(time);

        winLossResult = 
        (isDraw(winOrLoss))
        ?chalk.blueBright(winLossResult)
        :(isWin(winOrLoss))
        ?chalk.greenBright(winLossResult)
        :chalk.redBright(winLossResult)

        profitText = 
        (isNegative(profit))
        ?chalk.redBright(profitText)
        :chalk.greenBright(profitText)

        profitSoFarText = 
        (isNegative(profitSoFar))
        ?chalk.redBright(profitSoFarText)
        :chalk.greenBright(profitSoFarText)
    }
}

function isWin(winOrLoss:string){
    return winOrLoss.toLowerCase() === "win";
}
function isDraw(winOrLoss:string){
    return winOrLoss.toLowerCase() === "equal";
}

function noGale(gale:number){
    return gale === 0
}

