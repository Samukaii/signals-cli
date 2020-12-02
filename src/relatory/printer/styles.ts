import chalk from "chalk"
import { percentOfWindow } from "./utils"

export const windowInfo = {
    width:process.stdout.columns
}


export const paddings = {
    time:percentOfWindow(8),
    profitReceived:percentOfWindow(25),
    winOrLoss:percentOfWindow(25),
    profitSoFar:percentOfWindow(25)
}

export const colors = {
    table: chalk.blueBright,
    positive:chalk.greenBright.bold,
    negative:chalk.redBright.bold,
    cyan:chalk.cyanBright.bold,
    time:chalk.magentaBright,
    stats:chalk.yellowBright
}