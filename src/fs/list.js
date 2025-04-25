import { promises as fs } from 'fs';
import { join } from 'path';

const TARGET_DIR = 'files'
const ERROR_MESSAGES = {
    FS_OPERATION_FAILED: 'FS operation failed',
}

const checkDirExists = async (dirPath) => {
    try {
        await fs.access(dirPath);
        return true
    } catch(e) {
        return false
    }
}

const list = async () => {
    try {
        const dirPath = join(import.meta.dirname, TARGET_DIR);
        const isDirExists = await checkDirExists(dirPath)
        if (!isDirExists)
            throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED)

        const files = await fs.readdir(dirPath);
        const fileNames = files.map(file => file.split('.')[0])
        console.log(fileNames)
    } catch(e) {
        throw e;
    }
};

await list();