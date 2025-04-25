import { promises as fs } from 'fs';
import { join } from 'path';

const TARGET_DIR = 'files';
const TARGET_FILE_NAME = 'fileToRemove.txt';
const ERROR_MESSAGES = {
    FS_OPERATION_FAILED: 'FS operation failed',
}

async function checkExistsFile(filePath) {
    try {
        await fs.access(filePath);
        return true
    } catch(e) {
        return false
    }
}

const remove = async () => {
    try {
        const targetFilePath = join(import.meta.dirname, TARGET_DIR, TARGET_FILE_NAME);
        const isTargetFileExists = await checkExistsFile(targetFilePath)
        console.log(isTargetFileExists)
        if (!isTargetFileExists)
            throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED)

        await fs.rm(targetFilePath);
    } catch(e) {
        throw e;
    }
};

await remove();