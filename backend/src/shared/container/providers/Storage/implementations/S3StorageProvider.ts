import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';
import IStorageFile from '../model/IStorageFileProvider';

export default class DiskStorageFile implements IStorageFile {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-2',
        });
    }

    public async saveFile(fileName: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, fileName);

        const fileContent = await fs.promises.readFile(originalPath, {
            encoding: 'utf-8',
        });

        await this.client
            .putObject({
                Bucket: 'ester-gobarber',
                Key: fileName,
                ACL: 'public-read',
                Body: fileContent,
            })
            .promise();

        return fileName;
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
