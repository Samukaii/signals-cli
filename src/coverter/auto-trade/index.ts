// @ts-check
/** @type {import(".")} */
import chalk from 'chalk';
import fs from 'fs';
import scriptConfig from '../../config/scriptconfig.json';
import path from 'path';
//const __dirname = path.resolve();

const infoType = {
    timeFrame: "",
    active: "",
    time: "",
    entry: ""
}

function format(signalsInfo = [infoType]) {
    let contentToWrite = "";
    signalsInfo.forEach(info => {
        info.time = removeSeconds(info.time);

        let date = replaceColonWithComma(scriptConfig.date);

        let formatedSignalInfo = formatSignalInfo(info, date)

        contentToWrite += formatedSignalInfo + "\n";
    })


    generateFile(contentToWrite);
}

function replaceColonWithComma(date) {
    return date.split(":").join(",")
}


function removeSeconds(time = "") {
    const splitedTime = time.split(":");
    const hours = splitedTime[0];
    const minutes = splitedTime[1];

    return `${hours}:${minutes}`
}

function formatSignalInfo(info = infoType, date = "") {
    return `${date},${info.time},${info.active},${info.entry}`
}

function generateFile(info) {
    fs.writeFile(`${__dirname}/autotrader/trade.txt`, info, function (err) {
        if (err) {
            console.log(err)
            return;
        }
        console.log(chalk.greenBright('Arquivo gerado com sucesso!'));
    });
}


export { format }