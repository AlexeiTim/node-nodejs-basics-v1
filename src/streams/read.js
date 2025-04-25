import { createReadStream } from 'fs';
import { join } from 'path';
const TARGET_FILE =  join(import.meta.dirname, 'files/fileToRead.txt')
const read = async () => {
    const readStream = createReadStream(TARGET_FILE);
    readStream.on('data', (chunk) => {
        process.stdout.write(chunk)
    })
    readStream.on('end', () => {
        console.log('\nprocess end')
    })
    // Write your code here 
};

await read();