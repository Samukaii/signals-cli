/**@type {import('./extractor')} */
import { getEntryResult } from './entriesResult';
import { getStats } from './stats';


export default function createExtractor(content: string) {
    const removeSpaces = (fileContent: string) => fileContent.trim();
    const putFileLinesInArray = (fileContent: string) => fileContent.split(/\r?\n/);

    let lines: string[] = putFileLinesInArray(removeSpaces(content));

    return {
        getEntryResult: () => getEntryResult(lines),
        getStats: () => getStats(lines, content),
    }
}