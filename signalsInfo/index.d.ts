async function getSignals():Promise<[infoType]>

interface infoType {
    timeFrame: string
    active: string
    time: string
    entry: string
}

export {getSignals}
