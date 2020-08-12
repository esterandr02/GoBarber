import { container } from 'tsyringe';

import IStorageFile from './Storage/model/IStorageFile';
import DiskStorageFile from './Storage/implementations/DiskStorageFile';

import IMail from './Mail/model/IMail';

container.registerSingleton<IStorageFile>('StorageFile', DiskStorageFile);
