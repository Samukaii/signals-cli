/**@type {import('.')} */
import fs from 'fs';
import chalk from 'chalk';
import { TConfigInfo } from 'types';
import path from 'path';


export function convertAliasDate(alias:string){
    if(alias.toLowerCase()=="hoje"){
        let now = new Date();
        let day=now.getDate().toString().padStart(2,"0");
        let month=(now.getMonth() +1).toString().padStart(2,"0")
        let year=now.getFullYear();
        return `${day}:${month}:${year}`;
    }
    else if(alias.toLowerCase()=="ontem"){
        let now = new Date();
        let yesterday = new Date(now.setDate(now.getDate()-1))
        let day=yesterday.getDate().toString().padStart(2,"0");
        let month=(now.getMonth() +1).toString().padStart(2,"0")
        let year=now.getFullYear();
        return `${day}:${month}:${year}`;
    }
    else{
        return alias;
    }

}

export function isNegative(number:number|string){
    return number<0;
}

export function checkDateFormat(date:string){
    if(!date)return false
    if(date.match(/\w{2}:\w{2}:\w{4}/))return true;
    else return false;
}

export function replaceColonWithComma(date:string){
    let splitedDate = date.split(":");
    let day = splitedDate[0];
    let month = splitedDate[1];
    let year = splitedDate[2];

    return `${day},${month},${year}`;
}

export function saveConfig(configInfo:TConfigInfo){
    fs.writeFile(`${__dirname}/../config/scriptconfig.json`, JSON.stringify(configInfo), function (err) {
        if (err) return console.log(err);
        console.log(chalk.greenBright('Configurações salvas com sucesso!'));
      });
}

export function removeSeconds(time:string){
    const splitedTime = time.split(":");
    const hours = splitedTime[0];
    const minutes = splitedTime[1];

    return `${hours}:${minutes}`
}

export function compareTime(a:string,b:string){
    const splitedA = a.split(":");
    const splitedB = b.split(":");

    const timeA = {
        hours: parseFloat(splitedA[0]),
        minutes: parseFloat(splitedA[1])
    }
    const timeB = {
        hours: parseFloat(splitedB[0]),
        minutes: parseFloat(splitedB[1])
    }

    if(timeA.hours > timeB.hours) return 1;
    else if(timeA.hours < timeB.hours) return -1
    else{
        if(timeA.minutes>timeB.minutes)return 1;
        else if(timeA.minutes<timeB.minutes) return -1; 
        else return 0;
    }
}

export function isUndefineds(...objects:any[]){
    return objects.some(x=>{
        return typeof x === "undefined";
    })
}

export function isNumber(text:string){
    return !isNaN(parseFloat(text));
}
