/**@type {import './relatory-info'} */
import path from 'path';
const base_dir = path.resolve();
import fs from 'fs';
import createExtractor from './extractor';
import * as error from '../error';
import { printStats, printResults } from './printer';
import { getOptions } from './options';

const removeSpaces = (fileContent: string) => fileContent.trim();
const putFileLinesInArray = (fileContent: string) => fileContent.split(/\r?\n/);


export function relate(date: string) {
    getRelatory(findLogFile(date), date);
}

function findLogFile(date: string) {
    let [day, month, year] = date.split(":");

    return `${base_dir}/autotrader/logs/main_${year}${month}${day}.log`
}

function getRelatory(logFile: string, date: string) {
    if (!fs.existsSync(logFile)) {
        console.log(logFile);
        error.noLogFile(date);
        return;
    }


    fs.readFile(logFile, 'utf8', (err, fileContent) => {
        let extractor = createExtractor(fileContent);

        console.log(extractor.getEntryResult())
        //printResults(extractor.getEntryResult(), extractor.getStats());



        // if (err) console.log(err);

        // let contentWithoutSpaces = removeSpaces(fileContent);
        // let fileLinesInArray = putFileLinesInArray(contentWithoutSpaces);
        // let profit = 0;
        // let balance = getBalance(contentWithoutSpaces);

        // let stopLoss, takeProfit;

        // fileLinesInArray.forEach(line => {
        //     let lineInfo = createExtractor(line)

        //     printResults(lineInfo, getOptions(4));

        //     if (lineInfo.getWinValue(line) && lineInfo.getLossValue()) {
        //         profit += parseFloat(lineInfo.getWinValue()) + parseFloat(lineInfo.getLossValue());
        //     }

        //     if (!lineInfo.getStopLoss() | !lineInfo.getTakeProfit()) return;
        //     stopLoss = lineInfo.getStopLoss();
        //     takeProfit = lineInfo.getTakeProfit();
        // })
        // printStats(profit.toPrecision(4), balance, stopLoss, takeProfit, getOptions(4));
    })
}
