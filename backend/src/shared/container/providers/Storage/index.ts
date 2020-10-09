import { container } from 'tsyringe';

import IStorageFileProvider from './model/IStorageFileProvider';
import DiskStorageFileProvider from './implementations/DiskStorageFileProvider';

container.registerSingleton<IStorageFileProvider>(
    'StorageFileProvider',
    DiskStorageFileProvider,
);
