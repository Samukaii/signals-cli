import chalk from 'chalk';
import fs from 'fs';
import scriptConfig from '../../config/scriptconfig.json';
import path from 'path';
import { TSignalsInfo } from 'types';
const thisDirectory = path.resolve();


function format(signalsInfo:TSignalsInfo[]|undefined) {
    let contentToWrite:string = "";
    if(!signalsInfo)return

    signalsInfo.forEach(info => {
        info.time = removeSeconds(info.time);

        let date = replaceColonWithComma(scriptConfig.date);

        let formatedSignalInfo = formatSignalInfo(info, date)

        contentToWrite += formatedSignalInfo + "\n";
    })


    generateFile(contentToWrite);
}

function replaceColonWithComma(date:string) {
    return date.split(":").join(",")
}


function removeSeconds(time:string) {
    const splitedTime = time.split(":");
    const hours = splitedTime[0];
    const minutes = splitedTime[1];

    return `${hours}:${minutes}`
}

function formatSignalInfo(info:TSignalsInfo, date:string) {
    return `${date},${info.time},${info.active},${info.entry}`
}

function generateFile(info:string) {
    fs.writeFile(`${thisDirectory}/autotrader/trade.txt`, info, function (err) {
        if (err) {
            console.log(err)
            return;
        }
        console.log(chalk.greenBright('Arquivo gerado com sucesso!'));
    });
}


export { format }