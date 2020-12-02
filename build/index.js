"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("./commands/operations");
const error_1 = require("./error");
let args = {
    operation: process.argv[2]
};
function execute() {
    if (!args.operation) {
        operations_1.operations.help();
        return;
    }
    if (!operations_1.operations[args.operation]) {
        error_1.incorrectUsage();
        return;
    }
    operations_1.operations[args.operation]();
}
execute();
