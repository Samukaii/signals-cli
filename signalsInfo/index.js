/** @type {import(".")} */
import fs from 'fs';
import path from 'path';
import scriptconfig from '../scriptconfig.json';
import * as error from '../error.js'
const __dirname = path.resolve();

function getFileToFormat(){
    let [day, month, year] = scriptconfig.date.split(":");
    let signalFile = `${__dirname}/sabintrader/sinais_RichardDrigues${year}-${month}-${day}_${scriptconfig.time_frame}M.txt`
    if(!fs.existsSync(signalFile)) {
        error.noSignalsFile(scriptconfig.date, scriptconfig.time_frame);
        return;
    }
    return signalFile;
}
const convertFileToArray = (fileToFormat)=> new Promise(
    (resolve, reject)=>{
        fs.readFile(fileToFormat,"utf8",callback);
        
        const removeSpaces = (fileContent)=>fileContent.trim();
        const putFileLinesInArray = (fileContent)=>fileContent.split(/\r?\n/);
        
        function callback(err, fileContent){
            if(err) reject(err);
            
            let contentWithoutSpaces = removeSpaces(fileContent);
            let fileLinesInArray = putFileLinesInArray(contentWithoutSpaces);

            resolve(fileLinesInArray);
        }
    }
);

function extractSignalsInfo(arrayLines=[""]){
    const signalsInfo=[];

    const splitLineInArray = (line)=>line.split(";");
    const extractInfoOfLine = (lineInArray)=>(
        {
            timeFrame:lineInArray[0],
            active:lineInArray[1],
            time:lineInArray[2],
            entry:lineInArray[3]
        }
    )
    
    arrayLines.forEach(line=>{
        const lineInArray = splitLineInArray(line);
        const infoExtractedOfLine = extractInfoOfLine(lineInArray);
        signalsInfo.push(infoExtractedOfLine);
        signalsInfo.sort()
    })

    return signalsInfo;
}

function sortByTime(a,b){
    const [hoursA, minutesA] = a.time.split(":");
    const [hoursB, minutesB] = b.time.split(":");

    if(hoursA > hoursB) return 1;
    else if(hoursA < hoursB) return -1
    else{
        if(minutesA>minutesB)return 1;
        else if(minutesA<minutesB) return -1;
        else return 0;
    }
}


async function getSignals(){
    const fileConvertedToArray = await convertFileToArray(getFileToFormat());
    const signalsInfo = extractSignalsInfo(fileConvertedToArray);
    signalsInfo.sort(sortByTime)

    return signalsInfo;
}

export {getSignals};