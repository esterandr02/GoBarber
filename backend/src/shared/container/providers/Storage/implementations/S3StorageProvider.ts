import fs from 'fs';
import path from 'path';
import mime from 'mime';
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

        const ContentType = mime.getType(originalPath);

        if (!ContentType) {
            throw new Error('file not found.');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client
            .putObject({
                Bucket: uploadConfig.config.s3.bucket,
                Key: fileName,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(originalPath);

        return fileName;
    }

    public async deleteFile(fileName: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: uploadConfig.config.s3.bucket,
                Key: fileName,
            })
            .promise();
    }
}
