/**@type {import('./utils')} */
import fs from 'fs';
import chalk from 'chalk';

export function convertAliasDate(alias){
    if(alias.toLowerCase()=="hoje"){
        let now = new Date();
        let day=now.getDate();
        let month=now.getMonth() +1
        let year=now.getFullYear();
        return `${day}:${month}:${year}`;
    }
    else if(alias.toLowerCase()=="ontem"){
        let now = new Date();
        let day=now.getDate() -1;
        let month=now.getMonth() +1
        let year=now.getFullYear();
        return `${day}:${month}:${year}`;
    }
    else{
        return alias;
    }

}

export function replaceColonWithComma(date){
    let splitedDate = date.split(":");
    let day = splitedDate[0];
    let month = splitedDate[1];
    let year = splitedDate[2];

    return `${day},${month},${year}`;
}

export function saveConfig(configInfo){
    fs.writeFile('scriptconfig.json', JSON.stringify(configInfo), function (err) {
        if (err) return console.log(err);
        console.log(chalk.greenBright('Configurações salvas com sucesso!'));
      });
}
