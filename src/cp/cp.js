import { fork } from 'child_process';
import { join } from 'path';
const spawnChildProcess = async (args) => {
    const filePath = join(import.meta.dirname, 'files/script.js') 
    const childProc = fork(filePath, [...args], { silent: true })

    process.stdin.on('data', (data) => {
        childProc.stdin.write(data)
    })

    childProc.stdout.on('data', (data) => {
        process.stdout.write(data)
    })

    childProc.on('exit', () => {
        process.exit()
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
