"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horizontalLine = exports.percentOfWindow = exports.leftText = exports.centerText = void 0;
const styles_1 = require("./styles");
function centerText(text, padding) {
    text = text.toString();
    let parts = text.split('\n');
    parts = parts.map(s => s
        .padStart(s.length + Math.floor((padding - s.length) / 2), ' ')
        .padEnd(padding, ' '));
    return parts.join('\n');
}
exports.centerText = centerText;
function leftText(text, padding) {
    text = text.toString();
    let parts = text.split('\n');
    parts = parts.map(s => s.padEnd(padding, ' '));
    return parts.join('\n');
}
exports.leftText = leftText;
function percentOfWindow(percent) {
    return (percent / 100) * styles_1.windowInfo.width;
}
exports.percentOfWindow = percentOfWindow;
function horizontalLine(width, fill = '=') {
    if (width == "all")
        return fill.repeat(styles_1.windowInfo.width);
    return fill.repeat((width / 100) * styles_1.windowInfo.width);
}
exports.horizontalLine = horizontalLine;
