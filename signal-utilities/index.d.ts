interface infoType {
    timeFrame: string
    active: string
    time: string
    entry: string
}

export function getNextSignal(signalsInfo:[infoType]):string;
export function getPreviousSignal(signalsInfo:[infoType]):string;
export function getLastSignal(signalsInfo:[infoType]):string;
export function getExecutedSignal(signalsInfo:[infoType]):number;
export function getRemainingSignal(signalsInfo:[infoType]):number;