import code from 'node-cmd';
import os from 'os-utils';
import { spawn } from 'child_process';
let isRunning = false;
function runCommand() {
    process.stdout.write('\x1Bc');
    const command = os.platform() === 'win32'
        ? 'node'
        : 'node';

    const args = os.platform() === 'win32'
        ? ['AI_S.U.mjs']
        : ['AI_S.U.mjs'];
    const child = spawn(command, args, {
        detached: true,
        stdio: 'inherit'
    });
    child.unref();
    return true;
} if (runCommand()) {process.exit(0)}