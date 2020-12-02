"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignals = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const scriptconfig_json_1 = __importDefault(require("../config/scriptconfig.json"));
const error = __importStar(require("../error"));
const baseDir = path_1.default.resolve();
function getFileToFormat() {
    let [day, month, year] = scriptconfig_json_1.default.date.split(":");
    let signalFile = `${baseDir}/sabintrader/sinais_RichardDrigues${year}-${month}-${day}_${scriptconfig_json_1.default.time_frame}M.txt`;
    if (!fs_1.default.existsSync(signalFile)) {
        error.noSignalsFile(scriptconfig_json_1.default.date, scriptconfig_json_1.default.time_frame);
        return;
    }
    return signalFile;
}
const convertFileToArray = (fileToFormat) => new Promise((resolve, reject) => {
    fs_1.default.readFile(fileToFormat, "utf8", callback);
    const removeSpaces = (fileContent) => fileContent.trim();
    const putFileLinesInArray = (fileContent) => fileContent.split(/\r?\n/);
    function callback(err, fileContent) {
        if (err)
            reject(err);
        if (!fileContent)
            return;
        let contentWithoutSpaces = removeSpaces(fileContent);
        let fileLinesInArray = putFileLinesInArray(contentWithoutSpaces);
        resolve(fileLinesInArray);
    }
});
function extractSignalsInfo(arrayLines = [""]) {
    const signalsInfo = [];
    const splitLineInArray = (line) => line.split(";");
    const extractInfoOfLine = (lineInArray) => ({
        timeFrame: lineInArray[0],
        active: lineInArray[1],
        time: lineInArray[2],
        entry: parseFloat(lineInArray[3])
    });
    arrayLines.forEach(line => {
        const lineInArray = splitLineInArray(line);
        const infoExtractedOfLine = extractInfoOfLine(lineInArray);
        signalsInfo.push(infoExtractedOfLine);
        signalsInfo.sort(sortByTime);
    });
    return signalsInfo;
}
function sortByTime(a, b) {
    const [hoursA, minutesA] = a.time.split(":");
    const [hoursB, minutesB] = b.time.split(":");
    if (hoursA > hoursB)
        return 1;
    else if (hoursA < hoursB)
        return -1;
    else {
        if (minutesA > minutesB)
            return 1;
        else if (minutesA < minutesB)
            return -1;
        else
            return 0;
    }
}
function getSignals() {
    return __awaiter(this, void 0, void 0, function* () {
        const fileToFormat = getFileToFormat();
        if (!fileToFormat)
            return;
        const fileConvertedToArray = yield convertFileToArray(fileToFormat);
        const signalsInfo = extractSignalsInfo(fileConvertedToArray);
        signalsInfo.sort(sortByTime);
        return signalsInfo;
    });
}
exports.getSignals = getSignals;
