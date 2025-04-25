import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

const sourceFilePath = join(import.meta.dirname, 'files/fileToCompress.txt')
const targetFilePath = join(import.meta.dirname, 'files/archive.gz')

const compress = async () => {
    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(targetFilePath);
    const gzipStream = createGzip();

    readStream.on('data', (chunk) => {
        gzipStream.write(chunk)
    })

    gzipStream.on('data', (chunk) => {
        writeStream.write(chunk)
    })

    readStream.on('end', () => {
        gzipStream.end();
    })

    gzipStream.on('end', () => {
        writeStream.end();
    })
};

await compress();