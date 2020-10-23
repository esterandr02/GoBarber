import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageFile from '../model/IStorageFileProvider';

export default class DiskStorageFile implements IStorageFile {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const findFile = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(findFile);
        } catch {
            return;
        }

        await fs.promises.unlink(findFile);
    }
}
