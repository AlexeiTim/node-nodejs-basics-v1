import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';

const sourceFilePath = join(import.meta.dirname, 'files/archive.gz')
const targetFilePath = join(import.meta.dirname, 'files/fileToCompress.txt')

const decompress = async () => {
    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(targetFilePath);
    const gunZipStream = createGunzip();

    readStream.on('data', (chunk) => {
        gunZipStream.write(chunk)
    })

    gunZipStream.on('data', (chunk) => {
        writeStream.write(chunk)
    })

    readStream.on('end', () => {
        gunZipStream.end();
    })

    gunZipStream.on('end', () => {
        writeStream.end();
    })
};

await decompress();