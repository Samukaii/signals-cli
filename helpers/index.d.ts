export function convertAliasDate(aliasDate:string):string;
export function replaceColonWithComma(date:string):string;
export function saveConfig(configInfo:configInfo):void;
export function removeSeconds(time:string):string;
export function compareTime(a:string, b:string):number;
export function compareTime(a:string, b:string):number;
export function checkDateFormat(date:string):boolean;

interface configInfo{
    time_frame:string,
    date:string
}