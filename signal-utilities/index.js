/** @type {import(".")} */
import {compareTime,removeSeconds} from '../helpers/index.js'


export function getNextSignal(signalsInfo){
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`

    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);

        if(compareTime(signalTime, stringfiedDate)==1){
            return signalTime;
        }

    }

}


export function getExecutedSignal(signalsInfo){
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`

    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);

        if(compareTime(signalTime, stringfiedDate)==1){
            return index;
        }

    }
}
export function getPreviousSignal(signalsInfo){
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`
    let lastSignal;
    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);

        if(compareTime(signalTime, stringfiedDate)==-1){
            lastSignal = signalTime;
        }
    }
    return lastSignal;
}

export function getLastSignal(signalsInfo){
    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);
        if(index == signalsInfo.length-1)return signalTime;
    }
}
export function getRemainingSignal(signalsInfo){
    let now = new Date();
    let stringfiedDate = `${now.getHours()}:${now.getMinutes()}`

    for (let index = 0; index < signalsInfo.length; index++) {
        let signalTime = removeSeconds(signalsInfo[index].time);

        if(compareTime(signalTime, stringfiedDate)==1){
            return signalsInfo.length-index;
        }

    }
}
