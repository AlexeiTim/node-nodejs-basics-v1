import { promises as fs } from 'fs';
import { join } from 'path';


const __dirname = import.meta.dirname
const filePath = join(__dirname, 'files/fresh.txt')

const FILE_CONTENT = 'I am fresh and young'
const ERROR_MESSAGES = {
    FS_OPERATION_FAILED: 'FS operation failed'
}
const ERROR_CODES = {
    FILE_NOT_FOUND: 'ENOENT',
}

const create = async () => {
    try {
        await fs.access(filePath);
        throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED)
    } catch(e) {
        if (e.code !== ERROR_CODES.FILE_NOT_FOUND)
            throw e

        await fs.writeFile(filePath, FILE_CONTENT);
    }
};

await create();