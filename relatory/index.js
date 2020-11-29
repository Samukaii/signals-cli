/**@type {import './relatory-info'} */
const __dirname = path.resolve();
import fs from 'fs';
import path from 'path';
import createLineScrapping,{getBalance} from './scrapper.js';
import * as error from '../error.js';
import {printStats,printResults} from './printer.js';
import {getOptions} from './options.js';

const removeSpaces = (fileContent)=>fileContent.trim();
const putFileLinesInArray = (fileContent)=>fileContent.split(/\r?\n/);


export function relate(date){
    getRelatory(findLogFile(date),date);
}

function findLogFile(date){
    let [day , month, year] = date.split(":");

    return `${__dirname}/autotrader/logs/main_${year}${month}${day}.log`
}

function getRelatory(logFile, date){
    if(!fs.existsSync(logFile)){
        error.noLogFile(date);
        return;
    }
    

    fs.readFile(logFile,'utf8',(err, fileContent)=>{
        if(err)console.log(err);

        let contentWithoutSpaces = removeSpaces(fileContent);
        let fileLinesInArray = putFileLinesInArray(contentWithoutSpaces);
        let profit =0;
        let balance = getBalance(contentWithoutSpaces);

        let stopLoss, takeProfit;

        fileLinesInArray.forEach(line=>{
            let lineInfo = createLineScrapping(line)

            printResults(lineInfo,getOptions(4));

            if(lineInfo.getWinValue(line) && lineInfo.getLossValue()){
                profit += parseFloat(lineInfo.getWinValue()) + parseFloat(lineInfo.getLossValue());
            }
            
            if(!lineInfo.getStopLoss() | !lineInfo.getTakeProfit())return;
            stopLoss = lineInfo.getStopLoss();
            takeProfit = lineInfo.getTakeProfit();
        })
        printStats(profit.toPrecision(4), balance, stopLoss, takeProfit, getOptions(4));
    })
}
