"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrappLine = exports.scrappContent = exports.scrappContentAndConvertToNumber = void 0;
function scrappContentAndConvertToNumber(lines, regex) {
    let results = [{ lineIndex: 0, result: 0 }];
    lines.map((line, index) => {
        let result = scrappLine(line, regex);
        results.push({
            result: result ? parseFloat(result) : undefined,
            lineIndex: index
        });
    });
    results.shift();
    return results;
}
exports.scrappContentAndConvertToNumber = scrappContentAndConvertToNumber;
function scrappContent(lines, regex) {
    let results = [{ result: "", lineIndex: 0 }];
    lines.map((line, index) => {
        results.push({
            result: scrappLine(line, regex),
            lineIndex: index
        });
    });
    results.shift();
    return results;
}
exports.scrappContent = scrappContent;
function scrappLine(line, regex) {
    if (!line)
        return;
    //console.log(line);
    let match = line.match(regex);
    return match === null || match === void 0 ? void 0 : match[1];
}
exports.scrappLine = scrappLine;
