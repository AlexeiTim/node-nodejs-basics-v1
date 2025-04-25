import { createWriteStream } from 'fs';
import { join } from 'path';
const TARGET_FILE =  join(import.meta.dirname, 'files/fileToWrite.txt')

const write = async () => {
    const writeStream = createWriteStream(TARGET_FILE);
    process.stdin.on('data', (chunk) => {
        writeStream.write(chunk)
    })
};

await write();