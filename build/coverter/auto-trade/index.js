"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const scriptconfig_json_1 = __importDefault(require("../../config/scriptconfig.json"));
const path_1 = __importDefault(require("path"));
const thisDirectory = path_1.default.resolve();
function format(signalsInfo) {
    let contentToWrite = "";
    if (!signalsInfo)
        return;
    signalsInfo.forEach(info => {
        info.time = removeSeconds(info.time);
        let date = replaceColonWithComma(scriptconfig_json_1.default.date);
        let formatedSignalInfo = formatSignalInfo(info, date);
        contentToWrite += formatedSignalInfo + "\n";
    });
    generateFile(contentToWrite);
}
exports.format = format;
function replaceColonWithComma(date) {
    return date.split(":").join(",");
}
function removeSeconds(time) {
    const splitedTime = time.split(":");
    const hours = splitedTime[0];
    const minutes = splitedTime[1];
    return `${hours}:${minutes}`;
}
function formatSignalInfo(info, date) {
    return `${date},${info.time},${info.active},${info.entry}`;
}
function generateFile(info) {
    fs_1.default.writeFile(`${thisDirectory}/autotrader/trade.txt`, info, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(chalk_1.default.greenBright('Arquivo gerado com sucesso!'));
    });
}
