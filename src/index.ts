import { operations } from './commands/operations';
import { incorrectUsage } from './error';

let args = {
    operation: process.argv[2]
}

function execute() {
    if (!args.operation) {
        operations.help();
        return;
    }
    if (!operations[args.operation]) {
        incorrectUsage();
        return;
    }
    operations[args.operation]();
}


execute();


