"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingSignal = exports.getLastSignal = exports.getPreviousSignal = exports.getExecutedSignal = exports.getNextSignal = void 0;
const helpers_1 = require("../helpers");
function getNextSignal(signalsInfo) {
    if (!signalsInfo)
        return;
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`;
    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = helpers_1.removeSeconds(signalsInfo[index].time);
        if (helpers_1.compareTime(signalTime, stringfiedDate) == 1) {
            return signalTime;
        }
    }
}
exports.getNextSignal = getNextSignal;
function getExecutedSignal(signalsInfo) {
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`;
    if (!signalsInfo)
        return;
    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = helpers_1.removeSeconds(signalsInfo[index].time);
        if (helpers_1.compareTime(signalTime, stringfiedDate) == 1) {
            return index;
        }
    }
}
exports.getExecutedSignal = getExecutedSignal;
function getPreviousSignal(signalsInfo) {
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`;
    let lastSignal;
    if (!signalsInfo)
        return;
    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = helpers_1.removeSeconds(signalsInfo[index].time);
        if (helpers_1.compareTime(signalTime, stringfiedDate) == -1) {
            lastSignal = signalTime;
        }
    }
    return lastSignal;
}
exports.getPreviousSignal = getPreviousSignal;
function getLastSignal(signalsInfo) {
    if (!signalsInfo)
        return;
    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = helpers_1.removeSeconds(signalsInfo[index].time);
        if (index == signalsInfo.length - 1)
            return signalTime;
    }
}
exports.getLastSignal = getLastSignal;
function getRemainingSignal(signalsInfo) {
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`;
    if (!signalsInfo)
        return;
    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = helpers_1.removeSeconds(signalsInfo[index].time);
        if (helpers_1.compareTime(signalTime, stringfiedDate) == 1) {
            return signalsInfo.length - index;
        }
    }
}
exports.getRemainingSignal = getRemainingSignal;
