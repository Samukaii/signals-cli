export function convertAliasDate(aliasDate:string):string;
export function replaceColonWithComma(date:string):string;
export function saveConfig(configInfo:configInfo):void;

interface configInfo{
    time_frame:string,
    date:string
}