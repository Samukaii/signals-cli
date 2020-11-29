import { lineInfo } from "../interfaces";

export function getGale(entry:number, factor:number, value:number):number
export function getBalance(content:string):string|undefined
export function getTime(line:string):string
export function getStopLoss(line:string):string
export function getWinOrLoss(line:string):string
export function getTakeProfit(line:string):string
export function getEntryValue(line:string):string
export function getWinValue(line:string):string
export function getLossValue(line:string):string
export default function createScrapping(line:string):lineInfo