"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOptions = {
    '--mostrar-apenas': '',
    '--mostrar-apenas-entre': '',
    '--gales': '',
    '-g': '',
    '-d': '',
    '-m': '',
};
const keyConversionTable = {
    '--mostrar-apenas': 'show',
    '--mostrar-apenas-entre': 'show-between',
    '--gales': 'gales',
    '-g': 'gales',
    '-d': 'show-between',
    '-m': 'show',
};
const valueConversionTable = {
    'loss': 'loss',
    'l': 'loss',
    'wins': 'win',
    'win': 'win',
    'w': 'win',
    'empates': 'equal',
    'empate': 'equal',
    'e': 'equal'
};
const options = {};
function getOption(option) {
    process.argv.reduce(reduceOptions, 0);
    //console.log(options);
    if (!options[option])
        return;
    return options[option];
}
function reduceOptions(prevValue) {
    const currentArg = process.argv[prevValue];
    const nextArg = process.argv[prevValue + 1];
    if (!currentArg)
        return prevValue;
    if (isShortFormatOption(currentArg) && isAllowedOption(currentArg))
        options[convertKey(currentArg)] = convertValue(nextArg);
    else if (isLongFormatOption(currentArg)) {
        const [key, value] = currentArg.split('=');
        if (isAllowedOption(key))
            options[convertKey(key)] = convertValue(value);
    }
    return prevValue + 1;
}
function convertValue(value) {
    const valueLowerCase = value.toLowerCase();
    if (!valueConversionTable[valueLowerCase])
        return valueLowerCase;
    return valueConversionTable[valueLowerCase];
}
function convertKey(key) {
    return keyConversionTable[key];
}
function isShortFormatOption(arg) {
    return arg.match(/-\w/);
}
function isLongFormatOption(arg) {
    return arg.match(/--\w*\w*/);
}
function isAllowedOption(arg) {
    return allowedOptions.hasOwnProperty(arg);
}
const optionsManager = {
    getOption
};
exports.default = optionsManager;
