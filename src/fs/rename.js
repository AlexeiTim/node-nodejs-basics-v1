import { promises as fs } from 'fs';
import { join } from 'path';

const DIRECTORIES = {
    FILES: 'files',
}

const FILE_NAMES = {
    SOURCE: 'wrongFilename.txt',
    TARGET: 'properFilename.md',
}

const ERROR_MESSAGES = {
    FS_OPERATION_FAILED: 'FS operation failed',
}

const getFilePath = (fileName) => {
    return join(import.meta.dirname, DIRECTORIES.FILES, fileName)
}

const checkFileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true
    } catch(e) {
        return false
    }
}

const rename = async () => {
    try {
        const sourceFilePath = getFilePath(FILE_NAMES.SOURCE)
        const targetFilePath = getFilePath(FILE_NAMES.TARGET)

        const isSourceFileExists = await checkFileExists(sourceFilePath)
        if (!isSourceFileExists)
            throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED)

        const isTargetFileExists = await checkFileExists(targetFilePath)
        if (isTargetFileExists)
            throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED)

        await fs.rename(sourceFilePath, targetFilePath)
    } catch(e) {
        throw e;
    }
};

await rename();