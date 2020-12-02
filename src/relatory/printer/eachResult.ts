import chalk from "chalk";
import { TNotUndefinedScrapResult, TNotUndefinedEntriesResult } from "types";
import { resultStyle } from "./styles";
import { leftText, centerText } from "./utils";

type TEntriesResultScrap = TNotUndefinedScrapResult<TNotUndefinedEntriesResult>


export function printEachResult(entrieResults:TEntriesResultScrap[]){
    entrieResults.map((result) => {
        const texts = createTexts(result)
        console.log(`${texts.time} ${texts.profitText} | ${texts.winOrLoss} | ${texts.profitSoFarText}`);
    })
}

function createTexts(result:TEntriesResultScrap){
    let gales = result.result.gale
    let winOrLoss = result.result.winOrLoss
    let profit = result.result.profitReceived
    let profitSoFar:number = result.result.profitReceivedSoFar

    let time = result.result.time
    let profitText:string = profit.toString();
    let profitSoFarText:string = profitSoFar.toString()
    let resultA = `${winOrLoss} NO ${gales} GALE`

    format();
    alignInternal();
    alignExternal();
    colorize();

    return {
        time,
        profitText,
        winOrLoss:resultA,
        profitSoFarText
    }

    function alignInternal(){
        profitText = leftText(profitText,10);
        resultA = leftText(resultA,17) 
        profitSoFarText = leftText(profitSoFarText, 10)
    }
    function alignExternal(){
        time = centerText(time, resultStyle.time.padding)
        profitText = centerText(profitText,resultStyle.profitReceived.padding);
        resultA = centerText(resultA,resultStyle.winOrLoss.padding) 
        profitSoFarText = centerText(profitSoFarText, resultStyle.profitSoFar.padding)
    }

    function format(){
        profitText = `R$ ${profit.toFixed(2)}`
        profitSoFarText = `R$ ${profitSoFar.toFixed(2)}`
        time = `[${time}]`

        resultA = (noGale(gales))
        ?`${winOrLoss} SEM GALE`
        :`${winOrLoss} NO ${gales}° GALE`
    }

    function colorize(){
        time = chalk.magentaBright(time);

        resultA = 
        (isDraw(winOrLoss))
        ?chalk.blueBright(resultA)
        :(isWin(winOrLoss))
        ?chalk.greenBright(resultA)
        :chalk.redBright(resultA)

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

function isNegative(number:number|string){
    return number<0;
}