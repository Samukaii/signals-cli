import chalk from "chalk";
import { windowInfo } from "./styles";

export function centerText(text: string|number, padding: number) {

    text = text.toString();
    let parts = text.split('\n')

    parts = parts.map(s => s
        .padStart(s.length + Math.floor((padding - s.length) / 2), ' ')
        .padEnd(padding, ' ')
    );

    return parts.join('\n');
}

export function leftText(text:string|number, padding:number) {
    text = text.toString();
    let parts = text.split('\n')

    parts = parts.map(s => s.padEnd(padding, ' '));

    return parts.join('\n');
}

export function percentOfWindow(percent:number){
    return (percent/100)*windowInfo.width
}

export function horizontalLine(width:"all"|number, fill='='){
    if(width=="all")
    return fill.repeat(windowInfo.width);

    return fill.repeat((width/100) * windowInfo.width)
}