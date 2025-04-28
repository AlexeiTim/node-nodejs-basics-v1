import { spawn } from 'child_process';
import { join } from 'path';
const spawnChildProcess = async (args) => {
    const filePath = join(import.meta.dirname, 'files/script.js') 
    const childProc = spawn('node', [filePath,...args], {
        stdio: ['pipe', 'pipe', 'ipc'] 
    })
    process.stdin.pipe(childProc.stdin)
    childProc.stdout.pipe(process.stdout)
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
