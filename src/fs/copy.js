import { promises as fs } from 'fs';
import { join } from 'path';

const __dirname = import.meta.dirname
const destDirPath = join(__dirname, 'files_copy')
const srcDirPath = join(__dirname, 'files')
const ERROR_MESSAGES = {
    FS_OPERATION_FAILED: 'FS operation failed'
}

async function isDirExists(path) {
    try {
        await fs.access(destDirPath);
        return true
    } catch(e) {
        return false
    }
}
const copy = async () => {
    try {
        const isSrcDirExists = isDirExists(srcDirPath)
        if (!isSrcDirExists)
            throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED)

        const destDirExists = await isDirExists(destDirPath)
        if (destDirExists)
            throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED)

        await fs.cp(srcDirPath, destDirPath, { recursive: true });
    } catch(e) {
        throw e
    }
};

await copy();
