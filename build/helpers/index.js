"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isUndefineds = exports.compareTime = exports.removeSeconds = exports.saveConfig = exports.replaceColonWithComma = exports.checkDateFormat = exports.isNegative = exports.convertAliasDate = void 0;
/**@type {import('.')} */
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const currentDirectory = path_1.default.resolve();
function convertAliasDate(alias) {
    if (alias.toLowerCase() == "hoje") {
        let now = new Date();
        let day = now.getDate().toString().padStart(2, "0");
        let month = (now.getMonth() + 1).toString().padStart(2, "0");
        let year = now.getFullYear();
        return `${day}:${month}:${year}`;
    }
    else if (alias.toLowerCase() == "ontem") {
        let now = new Date();
        let yesterday = new Date(now.setDate(now.getDate() - 1));
        let day = yesterday.getDate().toString().padStart(2, "0");
        let month = (now.getMonth() + 1).toString().padStart(2, "0");
        let year = now.getFullYear();
        return `${day}:${month}:${year}`;
    }
    else {
        return alias;
    }
}
exports.convertAliasDate = convertAliasDate;
function isNegative(number) {
    return number < 0;
}
exports.isNegative = isNegative;
function checkDateFormat(date) {
    if (!date)
        return false;
    if (date.match(/\w{2}:\w{2}:\w{4}/))
        return true;
    else
        return false;
}
exports.checkDateFormat = checkDateFormat;
function replaceColonWithComma(date) {
    let splitedDate = date.split(":");
    let day = splitedDate[0];
    let month = splitedDate[1];
    let year = splitedDate[2];
    return `${day},${month},${year}`;
}
exports.replaceColonWithComma = replaceColonWithComma;
function saveConfig(configInfo) {
    fs_1.default.writeFile(`${__dirname}/../config/scriptconfig.json`, JSON.stringify(configInfo), function (err) {
        if (err)
            return console.log(err);
        console.log(chalk_1.default.greenBright('Configurações salvas com sucesso!'));
    });
}
exports.saveConfig = saveConfig;
function removeSeconds(time) {
    const splitedTime = time.split(":");
    const hours = splitedTime[0];
    const minutes = splitedTime[1];
    return `${hours}:${minutes}`;
}
exports.removeSeconds = removeSeconds;
function compareTime(a, b) {
    const splitedA = a.split(":");
    const splitedB = b.split(":");
    const timeA = {
        hours: parseFloat(splitedA[0]),
        minutes: parseFloat(splitedA[1])
    };
    const timeB = {
        hours: parseFloat(splitedB[0]),
        minutes: parseFloat(splitedB[1])
    };
    if (timeA.hours > timeB.hours)
        return 1;
    else if (timeA.hours < timeB.hours)
        return -1;
    else {
        if (timeA.minutes > timeB.minutes)
            return 1;
        else if (timeA.minutes < timeB.minutes)
            return -1;
        else
            return 0;
    }
}
exports.compareTime = compareTime;
function isUndefineds(...objects) {
    return objects.some(x => {
        return typeof x === "undefined";
    });
}
exports.isUndefineds = isUndefineds;
function isNumber(text) {
    return !isNaN(parseFloat(text));
}
exports.isNumber = isNumber;
