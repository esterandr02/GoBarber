import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageFile from '../model/IStorageFile';

export default class DiskStorageFile implements IStorageFile {
    public async saveFile(file: string): Promise<string> {
        // rename: mover arquivos
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const findFile = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            // stat: buscar infos do arquivo
            await fs.promises.stat(findFile);
        } catch {
            return;
        }
        // unlink: deletar o arquivo
        await fs.promises.unlink(findFile);
    }
}
