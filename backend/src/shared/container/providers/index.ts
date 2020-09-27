import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IStorageFileProvider from './Storage/model/IStorageFileProvider';
import DiskStorageFileProvider from './Storage/implementations/DiskStorageFileProvider';

import IMailProvider from './Mail/model/IMailProvider';
import EtherealMailProvider from './Mail/implementations/EtherealMailProvider';
import SESMailProvider from './Mail/implementations/SESMailProvider';

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

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailConfig.driver === 'ethereal'
        ? container.resolve(EtherealMailProvider)
        : container.resolve(SESMailProvider),
);
