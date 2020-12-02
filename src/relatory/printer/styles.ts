import { percentOfWindow } from "./utils"

export const windowInfo = {
    width:process.stdout.columns
}


export const resultStyle = {
    time:{
        padding: percentOfWindow(5.5)
    },
    profitReceived:{
        padding: percentOfWindow(25)
    },
    winOrLoss:{
        padding: percentOfWindow(25)
    },
    profitSoFar:{
        padding: percentOfWindow(25)
    }
}