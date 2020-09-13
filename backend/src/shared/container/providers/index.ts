import { container } from 'tsyringe';

import IStorageFileProvider from './Storage/model/IStorageFileProvider';
import DiskStorageFileProvider from './Storage/implementations/DiskStorageFileProvider';

import IMailProvider from './Mail/model/IMailProvider';
import EtherealMailProvider from './Mail/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplate/model/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplate/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageFileProvider>(
    'StorageFileProvider',
    DiskStorageFileProvider,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

// registrar uma instancia chamando o constructor
container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
