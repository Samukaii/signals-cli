"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEntries = void 0;
const helpers_1 = require("../helpers");
const options_1 = __importDefault(require("./options"));
const filters = [
    filterGale,
    filterShow,
    filterShowBetween
];
function filterEntries(entries) {
    let filteredEntries = entries.filter(entry => {
        let filtersResult = [];
        filters.map(filter => {
            filter(entry, filtersResult);
        });
        return filtersResult.every(filter => filter);
    });
    return filteredEntries;
}
exports.filterEntries = filterEntries;
function filterGale(entry, filter) {
    let gales = options_1.default.getOption('gales');
    if (!gales)
        return;
    filter.push(entry.result.gale == gales);
}
function filterShow(entry, filter) {
    var _a;
    let show = options_1.default.getOption('show');
    if (!show)
        return;
    filter.push(((_a = entry.result.winOrLoss) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == show);
}
function filterShowBetween(entry, filter) {
    var _a, _b;
    let showBetween = options_1.default.getOption('show-between');
    if (!showBetween)
        return;
    if (!entry.result.time)
        return;
    const [timeA, timeB] = showBetween.split(',');
    const comparissionA = helpers_1.compareTime((_a = entry.result.time) === null || _a === void 0 ? void 0 : _a.slice(0, 5), timeA);
    const comparissionB = helpers_1.compareTime((_b = entry.result.time) === null || _b === void 0 ? void 0 : _b.slice(0, 5), timeB);
    filter.push(comparissionA == 1 && comparissionB == -1);
}
