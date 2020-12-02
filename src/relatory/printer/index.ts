import { TStatsResult,TNotUndefinedScrapResult, TNotUndefinedEntriesResult } from 'types';
import { printEachResult } from './eachResult';
import {printHeader} from './header';
import { printStats } from './stats';

type TEntriesResultScrap = TNotUndefinedScrapResult<TNotUndefinedEntriesResult>

export function printResults(entryResults: TEntriesResultScrap[], stats: TStatsResult) {
    printHeader();
    printEachResult(entryResults);
    printStats(stats);
}