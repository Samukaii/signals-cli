"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
const _1 = require(".");
exports.operations = {
    proximo: _1.nextSignal,
    anterior: _1.previous,
    total: _1.countSignal,
    formatar: _1.formatSignals,
    relatorio: _1.relatory,
    restantes: _1.remaining,
    executados: _1.executed,
    ultimo: _1.last,
    config: _1.config,
    help: _1.usage,
    "-h": _1.usage,
    "--help": _1.usage,
};
