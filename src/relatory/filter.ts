import { compareTime } from '../helpers';
import { TEntriesResult, TNotUndefinedEntriesResult, TNotUndefinedScrapResult } from "types";
import options from './options';

type TEntry = TNotUndefinedScrapResult<TNotUndefinedEntriesResult>;

const filters= [
    filterGale,
    filterShow,
    filterShowBetween
]

export function filterEntries(entries:TEntry[]){
    let filteredEntries = entries.filter(entry=>{
        let filtersResult:any[] = []
        filters.map(filter=>{
            filter(entry, filtersResult);
        })

        return filtersResult.every(filter=>filter);
    });
    return filteredEntries;
}

function filterGale(entry:TEntry, filter:boolean[]){
    let gales = options.getOption('gales');
    if(!gales)return;
    filter.push(entry.result.gale == gales);
}
function filterShow(entry:TEntry, filter:boolean[]){
    let show = options.getOption('show');
    if(!show)return;
    filter.push(entry.result.winOrLoss?.toLowerCase() == show);
}
function filterShowBetween(entry:TEntry, filter:boolean[]){
    let showBetween = options.getOption('show-between') as string;
    if(!showBetween)return;
    if(!entry.result.time)return;

    const [timeA, timeB] = showBetween.split(',');

    const comparissionA = compareTime(entry.result.time?.slice(0,5),timeA);
    const comparissionB = compareTime(entry.result.time?.slice(0,5),timeB);

    filter.push(comparissionA==1 && comparissionB==-1);
}