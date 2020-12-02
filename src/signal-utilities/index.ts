import { compareTime, removeSeconds } from '../helpers'
import { ISignalsInfo } from 'types/interfaces';
import { TSignalsInfo } from 'types';


export function getNextSignal(signalsInfo: TSignalsInfo[]|undefined) {
    if(!signalsInfo)return;
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`

    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);

        if (compareTime(signalTime, stringfiedDate) == 1) {
            return signalTime;
        }

    }

}


export function getExecutedSignal(signalsInfo: TSignalsInfo[]|undefined) {
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`
    if(!signalsInfo)return;

    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);

        if (compareTime(signalTime, stringfiedDate) == 1) {
            return index;
        }

    }
}
export function getPreviousSignal(signalsInfo: TSignalsInfo[]|undefined) {
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`
    let lastSignal;
    if(!signalsInfo)return;

    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);

        if (compareTime(signalTime, stringfiedDate) == -1) {
            lastSignal = signalTime;
        }
    }
    return lastSignal;
}

export function getLastSignal(signalsInfo: TSignalsInfo[]|undefined) {
    if(!signalsInfo)return;

    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);
        if (index == signalsInfo.length - 1) return signalTime;
    }
}
export function getRemainingSignal(signalsInfo: TSignalsInfo[]|undefined) {
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`
    if(!signalsInfo)return;

    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);

        if (compareTime(signalTime, stringfiedDate) == 1) {
            return signalsInfo.length - index;
        }

    }
}
