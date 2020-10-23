import { container } from 'tsyringe';

import uploagConfig from '@config/upload';

import IStorageFileProvider from './model/IStorageFileProvider';

import S3StorageProvider from './implementations/S3StorageProvider';
import DiskStorageFileProvider from './implementations/DiskStorageProvider';

const providers = {
    disk: DiskStorageFileProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageFileProvider>(
    'StorageFileProvider',
    providers[uploagConfig.driver],
);
