/**@type {import './relatory-info'} */
import path from 'path';
const base_dir = path.resolve();
import fs from 'fs';
import createExtractor from './extractor';
import * as error from '../error';
import { printResults } from './printer';
import { filterEntries } from './filter';

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

        let filteredResult = filterEntries(extractor.getEntryResult());
        printResults(filteredResult, extractor.getStats());
    })
}
