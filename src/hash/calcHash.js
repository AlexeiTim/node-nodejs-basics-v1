import { createHash } from 'crypto';
import { join } from 'path';
import { createReadStream } from 'fs';

const calculateHash = async () => {
        const TARGET_FILE_PATH = join(import.meta.dirname, 'files/fileToCalculateHashFor.txt')
        const hash = createHash("SHA256")
        const readStream = createReadStream(TARGET_FILE_PATH);

        readStream.on('data', (chunk) => {
            hash.update(chunk)
        })
    
        readStream.on('end', () => {
            const hexHash = hash.digest('hext');
            console.log(hexHash)
        })

        readStream.on('error', (err) => {
           throw err;
        })
};

await calculateHash();