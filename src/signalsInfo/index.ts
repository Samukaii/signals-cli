import fs from 'fs';
import path from 'path';
import scriptconfig from '../config/scriptconfig.json';
import * as error from '../error'
import { ISignalsInfo } from 'types/interfaces';
const baseDir = path.resolve();


function getFileToFormat(): string | undefined {
    let [day, month, year] = scriptconfig.date.split(":");
    let signalFile = `${baseDir}/sabintrader/sinais_RichardDrigues${year}-${month}-${day}_${scriptconfig.time_frame}M.txt`
    if (!fs.existsSync(signalFile)) {
        error.noSignalsFile(scriptconfig.date, scriptconfig.time_frame);
        return;
    }
    return signalFile;
}
const convertFileToArray = (fileToFormat: string): Promise<string[] | undefined> => new Promise(
    (resolve, reject) => {
        fs.readFile(fileToFormat, "utf8", callback);

        const removeSpaces = (fileContent: string) => fileContent.trim();
        const putFileLinesInArray = (fileContent: string) => fileContent.split(/\r?\n/);

        function callback(err: NodeJS.ErrnoException | null, fileContent: string | null) {
            if (err) reject(err);

            if (!fileContent) return
            let contentWithoutSpaces = removeSpaces(fileContent);
            let fileLinesInArray = putFileLinesInArray(contentWithoutSpaces);

            resolve(fileLinesInArray);
        }
    }
);

function extractSignalsInfo(arrayLines = [""]) {
    const signalsInfo: any[] | [ISignalsInfo] = [];

    const splitLineInArray = (line: string) => line.split(";");
    const extractInfoOfLine = (lineInArray: string[]) => (
        {
            timeFrame: lineInArray[0],
            active: lineInArray[1],
            time: lineInArray[2],
            entry: lineInArray[3]
        }
    )

    arrayLines.forEach(line => {
        const lineInArray = splitLineInArray(line);
        const infoExtractedOfLine = extractInfoOfLine(lineInArray);
        signalsInfo.push(infoExtractedOfLine);
        signalsInfo.sort(sortByTime)
    })

    return signalsInfo;
}

function sortByTime(a: { time: string }, b: { time: string }) {
    const [hoursA, minutesA] = a.time.split(":");
    const [hoursB, minutesB] = b.time.split(":");

    if (hoursA > hoursB) return 1;
    else if (hoursA < hoursB) return -1
    else {
        if (minutesA > minutesB) return 1;
        else if (minutesA < minutesB) return -1;
        else return 0;
    }
}


async function getSignals() {
    const fileToFormat = getFileToFormat();
    if (!fileToFormat) return
    const fileConvertedToArray = await convertFileToArray(fileToFormat);
    const signalsInfo = extractSignalsInfo(fileConvertedToArray);
    signalsInfo.sort(sortByTime)

    return signalsInfo;
}

export { getSignals };