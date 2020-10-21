import { container } from 'tsyringe';

import IStorageFileProvider from './model/IStorageFileProvider';

import S3StorageProvider from './implementations/S3StorageProvider';
import DiskStorageFileProvider from './implementations/DiskStorageFileProvider';

const providers = {
    disk: DiskStorageFileProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageFileProvider>(
    'StorageFileProvider',
    providers.s3,
);
