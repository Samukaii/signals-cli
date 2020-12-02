import { TScrapResult } from "types";

export function scrappContentAndConvertToNumber(lines: string[], regex: RegExp): TScrapResult<number>[] {
    let results: TScrapResult<number>[] = [{ lineIndex: 0, result: 0 }]

    lines.map((line, index) => {
        let result = scrappLine(line, regex)

        results.push(
            {
                result: result ? parseFloat(result) : undefined,
                lineIndex: index
            })
    })

    results.shift();
    return results
}

export function scrappContent(lines: string[], regex: RegExp): TScrapResult<string>[] {
    let results: TScrapResult<string>[] = [{ result: "", lineIndex: 0 }]

    lines.map((line, index) => {
        results.push(
            {
                result: scrappLine(line, regex),
                lineIndex: index
            })
    })
    results.shift();

    return results
}

export function scrappLine(line: string, regex: RegExp) {
    if(!line)return
    //console.log(line);
    let match = line.match(regex);

    return match?.[1];
}
