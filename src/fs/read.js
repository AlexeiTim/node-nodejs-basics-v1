import { promises as fs } from 'fs';
import { join } from 'path';


const TARGET_DIR = 'files'
const TARGET_FILE_NAME = 'fileToRead.txt';
const ERROR_MESSAGES = {
    FS_OPERATION_FAILED: 'FS operation failed',
}

const checkFileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true
    } catch(e) {
        return false
    }
}

const read = async () => {
    try {
        const targetFilePath = join(import.meta.dirname, TARGET_DIR, TARGET_FILE_NAME);
        const isTargetFileExists = await checkFileExists(targetFilePath);
        if (!isTargetFileExists)
            throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED)

        const data = await fs.readFile(targetFilePath, 'utf-8');
        console.log(data)
    } catch(e) {
        throw e;
    }
};

await read();