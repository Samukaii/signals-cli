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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relate = void 0;
/**@type {import './relatory-info'} */
const path_1 = __importDefault(require("path"));
const base_dir = path_1.default.resolve();
const fs_1 = __importDefault(require("fs"));
const extractor_1 = __importDefault(require("./extractor"));
const error = __importStar(require("../error"));
const printer_1 = require("./printer");
const filter_1 = require("./filter");
function relate(date) {
    getRelatory(findLogFile(date), date);
}
exports.relate = relate;
function findLogFile(date) {
    let [day, month, year] = date.split(":");
    return `${base_dir}/autotrader/logs/main_${year}${month}${day}.log`;
}
function getRelatory(logFile, date) {
    if (!fs_1.default.existsSync(logFile)) {
        console.log(logFile);
        error.noLogFile(date);
        return;
    }
    fs_1.default.readFile(logFile, 'utf8', (err, fileContent) => {
        let extractor = extractor_1.default(fileContent);
        let filteredResult = filter_1.filterEntries(extractor.getEntryResult());
        printer_1.printResults(filteredResult, extractor.getStats());
    });
}
